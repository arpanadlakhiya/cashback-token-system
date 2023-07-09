package smartcontracts

import (
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type CashbackGenerator struct {
	contractapi.Contract
}

func (fc *CashbackGenerator) GenerateCashback(ctx contractapi.TransactionContextInterface) (bool, error) {
	fmt.Printf("CashbackGenerator.GenerateCashback :: Cashback generation started")

	return true, nil
}
