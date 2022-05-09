#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$PLAYER2" ] && echo "Missing \$PLAYER2 environment variable" && exit 1

echo
echo 'About to call say() on the contract'
echo near call \$CONTRACT add '{"id": "$1", "addNum": "$2"}' --account_id \$PLAYER2
echo
echo \$CONTRACT is $CONTRACT
echo \$PLAYER2 is $PLAYER2
echo \$1 is [ $1 ] '(newGame.id)'
echo \$2 is [ $2 ] '(addNum)'
echo
near call $CONTRACT add '{"id": "'"$1"'", "addNum": '"$2"'}' --account_id $PLAYER2