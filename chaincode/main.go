package main

import (
	"log"

	"github.com/cashback-token-system/chaincode/smartcontracts"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	cashbackContract := new(smartcontracts.CashbackContract)
	rulesetContract := new(smartcontracts.RulesetContract)
	transactionContract := new(smartcontracts.TransactionSimulator)
	userWalletContract := new(smartcontracts.UserWallet)

	chaincode, err := contractapi.NewChaincode(cashbackContract, rulesetContract, transactionContract, userWalletContract)

	if err != nil {
		log.Printf("Error creating chaincode: %s", err.Error())
	}

	if err := chaincode.Start(); err != nil {
		log.Printf("Error starting chaincode: %s", err.Error())
	} else {
		log.Printf("Started chaincode: %s", err.Error())
	}
}
