cd ../hlf-network/vars/chaincode/cashback-token-system/go/

rm -rf *

cp -R ../../../../../cashback-token-system/* .

cd ../../../../

./minifab ccup -v $1 -n cashback-token-system -l go