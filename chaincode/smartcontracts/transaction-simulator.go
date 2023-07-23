package smartcontracts

import (
	"encoding/json"
	"fmt"

	"github.com/cashback-token-system/chaincode/models"
	"github.com/cashback-token-system/chaincode/utils"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type TransactionSimulator struct {
	contractapi.Contract
}

func (ts *TransactionSimulator) SimulateTransaction(
	ctx contractapi.TransactionContextInterface,
	rulesetId string,
	cashbackTokenId string,
) (bool, error) {
	fmt.Printf("TransactionSimulator.SimulateTransaction :: Started transaction simulation")

	// Get transaction details from transient
	txnTransient, err := utils.GetTransientData(ctx, utils.TXN_TRANSIENT)
	if err != nil {
		errStr := fmt.Errorf("error while getting transient data: %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	// Unmarshall transaction details to model
	var transaction models.Transaction
	err = json.Unmarshal(txnTransient, &transaction)
	if err != nil {
		errStr := fmt.Errorf("error while unmarshalling data: %s", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	// Update Txn ID
	transaction.TxnId = ctx.GetStub().GetTxID()

	// Check if cashback can be applied
	if cashbackTokenId != "" {
		fmt.Printf("TransactionSimulator.SimulateTransaction :: Claiming cashback on ID %s",
			cashbackTokenId)

		// Claim cashback token
		claimCashback, err := ClaimCashback(
			ctx,
			transaction.TxnId,
			cashbackTokenId,
			transaction.SenderAddress,
		)
		if err != nil {
			errStr := fmt.Errorf("error while claiming cashback, %v", err.Error())
			fmt.Println(errStr)
			return false, errStr
		}

		if claimCashback.Value > transaction.Value {
			errStr := fmt.Errorf("cashback is greater than transaction amount")
			fmt.Println(errStr)
			return false, errStr
		}

		// Apply cashback on transaction
		transaction.Value = transaction.Value - claimCashback.Value
		transaction.CashbackUsedValue = claimCashback.Value

		fmt.Printf("TransactionSimulator.SimulateTransaction :: Claimed cashback on ID %s",
			cashbackTokenId)
	} else {
		transaction.CashbackUsedValue = 0
	}

	fmt.Printf("TransactionSimulator.SimulateTransaction :: Storing transaction on txn ID %s",
		transaction.TxnId)

	// Put transaction in public state
	err = utils.PutState(ctx, transaction.TxnId, transaction)
	if err != nil {
		errStr := fmt.Errorf("error while putting state, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	// Check if cashback can be generated
	if rulesetId != "" {
		fmt.Printf("TransactionSimulator.SimulateTransaction :: Generating cashback on ruleset ID %s",
			rulesetId)

		generatedCashback, err := GenerateCashback(
			ctx,
			transaction.TxnId,
			rulesetId,
			transaction.SenderAddress,
		)
		if err != nil {
			errStr := fmt.Errorf("error while generating cashback, %v", err.Error())
			fmt.Println(errStr)
			return false, errStr
		}

		fmt.Printf("TransactionSimulator.SimulateTransaction :: Generated cashback on ruleset ID %s, cashback ID",
			rulesetId, generatedCashback.ID)
	}

	fmt.Printf("TransactionSimulator.SimulateTransaction :: Simulated transaction with ID %s", transaction.TxnId)

	return true, nil
}

func (ts *TransactionSimulator) QueryAllTransactions(
	ctx contractapi.TransactionContextInterface,
) ([]string, error) {
	fmt.Printf("TransactionSimulator.QueryAllTransactions :: Querying all transactions")

	queryString := fmt.Sprintf(`{"selector":{"docType":"%s"}}`, utils.DOCTYPE_TXN)

	resultsIterator, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		errStr := fmt.Errorf("error while fetching query result, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	defer resultsIterator.Close()

	data, err := utils.ConstructResponseFromIterator(resultsIterator)
	if err != nil {
		errStr := fmt.Errorf("error while constructing response, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	return data, nil
}
