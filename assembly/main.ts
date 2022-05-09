import {
  context,
  ContractPromiseBatch,
  logging,
  u128,
  storage,
} from "near-sdk-as";
import { Game21, games, State } from "./model";

// change methods

export function createGame(): string {
  // attach 0.1 near to create a game
  const newGame = new Game21();
  assert(
    context.attachedDeposit == u128.fromString("100000000000000000000000"),
    "Game21 has need 0.1 Near to play game"
  );
  
  games.set(newGame.id, newGame);
  storage.set("number", 0);
  newGame.state = State.Created;

  return newGame.id;
}

export function joinGame(id: string): string {
  assert(games.contains(id), "Game does not exist");
  assert(
    context.attachedDeposit == u128.fromString("100000000000000000000000"),
    "Please deposit exactly 0.1 NEAR to join a game"
  );
  const newGame = games.getSome(id);

  assert(newGame.player2 == "", "This game already has two players");
  assert(
    newGame.player1 != context.sender,
    "You can not play with yourself :("
  );

  // Player2 deposits 0.1 NEAR to join the game
  newGame.totalAmount = u128.add(newGame.totalAmount, context.attachedDeposit);
  logging.log(newGame.totalAmount);

  newGame.player2 = context.sender;
  newGame.state = State.StartedAlready;
  logging.log(newGame.state);

  games.set(id, newGame);

  return `${newGame.player2} Joined the game , waiting for to make the first move \n NUMBER IS 0`;
}

function setNextPlayer(player: string, game: Game21): string {
  if (player == game.player1) {
    game.whoseTurn = game.player2;
  } else {
    game.whoseTurn = game.player1;
  }
  return game.whoseTurn;
}
export function add(id: string, addNum: u32): string {
    assert(addNum<4,"it must be 1,2,3")
     assert(addNum>0,"it must be 1,2,3")
  const newGame = games.getSome(id);
  assert(newGame.whoseTurn == context.sender, "Its not your turn");
  let number = storage.getSome<u32>("number");
  storage.set("number", number + addNum);

  newGame.whoseTurn = setNextPlayer(context.sender, newGame);
  games.set(id, newGame);
  if (number + addNum < 21) {
    return `You added ${addNum} ,new number is  ${number + addNum} .Turn Has Changed ${newGame.whoseTurn}'s turn.!!  `;
  } else {
    let result = finishGame(id);
    return result;
  }
}

export function finishGame(id: string): string {
  const newGame = games.getSome(id);
  newGame.state = State.GameOver;
  let to_winner: ContractPromiseBatch;
  let winner: string;
  if (newGame.whoseTurn == newGame.player1) {
    to_winner = ContractPromiseBatch.create(newGame.player1);
    winner = newGame.player1;
  } else {
    to_winner = ContractPromiseBatch.create(newGame.player2);
    winner = newGame.player2;
  }
 
  const amount_to_receive = newGame.totalAmount;
  to_winner.transfer(amount_to_receive);
  games.set(newGame.id, newGame);
  return ` ${winner} won the game and earned  money `;
}