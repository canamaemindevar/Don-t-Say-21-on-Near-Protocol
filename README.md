# DON'T SAY 21 as a NEAR contract

## Install dependencies

```
yarn
```

## Build and Deploy the contract

```
yarn build
near dev-deploy ./out/main.wasm
```

## How to Play 
1. At the beginning number is 0 each player can will add 1 or 2 or 3. 4 and more are not allowed. Who says 21 or more will lost.
2. Player1 calls function `createGame` and pays 0.1 NEAR to do it.
3. Player2 calls function `joinGame(id)` with id, as argument and pays 0.1 NEAR to do it.
4. Players calls function `add(id, addNum)` with id and addNum(the number which is chosen ) as arguments
5. Who says 21 will lost.
6. Winner Gets the reward 0.2 near.

## Run the game

**Create a game**

```
near call <contract-id> createGame --account_id <account-id> --amount 0.1
```

**Join the game**

```
near call <contract-id> joinGame '{"id": <id>}' --account_id <account-id> --amount 0.1
```

**Add the number**

```
near call <contract-id> play '{"id": <id>, "addNum": <number>}' --account_id <account-id>
```

---