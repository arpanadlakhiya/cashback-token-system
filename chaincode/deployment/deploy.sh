# mkdir -p ../../hlf-network/vars/chaincode/cashback-token-system/go

# cp spec.yaml ../../hlf-network/
# cp minifab ../../hlf-network/

# cp -R ../* ../../hlf-network/vars/chaincode/cashback-token-system/go

# cd ../../hlf-network/

# ./minifab up -o cashbackplatform -n cashback-token-system -i 2.3 -d false -l go -v 1.0 -r true -s couchdb -e 7000

mkdir -p ./vars/chaincode/cashback-token-system/go

cp -R ../smartcontracts ./vars/chaincode/cashback-token-system/go
cp -R ../models ./vars/chaincode/cashback-token-system/go
cp -R ../utils ./vars/chaincode/cashback-token-system/go
cp -R ../vendor ./vars/chaincode/cashback-token-system/go
cp ../go.sum ../go.mod ../main.go ./vars/chaincode/cashback-token-system/go

./minifab up -o cashbackplatform -n cashback-token-system -i 2.4 -d false -l go -v 1.0 -r true -s couchdb -e 7000
