# sudo rm -rf  ./vars/chaincode/cashback-token-system/go/

sudo cp -R ../smartcontracts ./vars/chaincode/cashback-token-system/go/
sudo cp -R ../models ./vars/chaincode/cashback-token-system/go/
sudo cp -R ../utils ./vars/chaincode/cashback-token-system/go/
sudo cp -R ../vendor ./vars/chaincode/cashback-token-system/go/
sudo cp ../go.sum ../go.mod ../main.go ./vars/chaincode/cashback-token-system/go/

./minifab ccup -v $1 -n cashback-token-system -l go