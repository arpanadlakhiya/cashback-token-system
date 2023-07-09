package main

import (
	"log"

	"github.com/cashback-token-system/chaincode/smartcontracts"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	cashbackGenerator := new(smartcontracts.CashbackGenerator)

	chaincode, err := contractapi.NewChaincode(cashbackGenerator)

	if err != nil {
		log.Printf("Error creating chaincode: %s", err.Error())
	}

	if err := chaincode.Start(); err != nil {
		log.Printf("Error starting chaincode: %s", err.Error())
	}
}
