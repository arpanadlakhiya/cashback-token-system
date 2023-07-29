mkdir -p ../../hlf-network/vars/chaincode/cashback-token-system/go

cp spec.yaml ../../hlf-network/
cp minifab ../../hlf-network/

cp -R ../* ../../hlf-network/vars/chaincode/cashback-token-system/go

cd ../../hlf-network/

./minifab up -o cashbackplatform -n cashback-token-system -i 2.3 -d false -l go -v 1.0 -r true -s couchdb -e 7000