import { context, u128, PersistentUnorderedMap, } from "near-sdk-as";

export enum State{
    Created,
    StartedAlready,
    GameOver
}
@nearBindgen
export class Game21{
    id: string;
    state: State;
    player1: string;
    player2: string;
    whoseTurn: string;
    totalAmount: u128;
    creationAmount: u128;
    number: i32;
   


constructor() {
    this.state=State.Created
    this.id = context.blockIndex.toString().slice(2, 8);
    this.player1 = context.sender;
    this.whoseTurn = this.player1;
    this.player2 = '';
    this.number = 0;
    this.totalAmount = context.attachedDeposit;
    this.creationAmount = context.attachedDeposit;
}

}

export const games = new PersistentUnorderedMap<string,Game21>('g')