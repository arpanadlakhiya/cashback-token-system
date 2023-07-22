mkdir -p ../../hlf-network/vars/chaincode/cashback-token-chain/go

cp spec.yaml ../../hlf-network/
cp minifab ../../hlf-network/

cp -R ../* ../../hlf-network/vars/chaincode/cashback-token-chain/go

cd ../../hlf-network/

./minifab up -o platform -n cashback-token-chain -i 2.4 -d false -l go -v 1.0 -r true -s couchdb -e 7000