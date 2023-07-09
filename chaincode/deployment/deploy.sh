mkdir -p ../../hlf-network/vars/chaincode/coffee-supply-chain/go

cp spec.yaml ../../hlf-network/
cp minifab ../../hlf-network/

cp -R ../* ../../hlf-network/vars/chaincode/coffee-supply-chain/go

cd ../../hlf-network/

./minifab up -o farmer -n coffee-supply-chain -i 2.3 -d false -l go -v 1.0 -r true -s couchdb -e 7000