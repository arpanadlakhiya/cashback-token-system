package smartcontracts

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/google/uuid"

	"github.com/cashback-token-system/chaincode/models"
	"github.com/cashback-token-system/chaincode/utils"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type CashbackContract struct {
	contractapi.Contract
}

func GenerateCashback(
	ctx contractapi.TransactionContextInterface,
	transaction models.Transaction,
	rulesetId string,
	userWallet string,
) (*models.CashbackToken, error) {
	fmt.Printf("CashbackContract.GenerateCashback :: Cashback generation started for transaction %s",
		transaction.TxnId)

	// Fetch ruleset details to be applied on the transaction
	ruleset, err := FetchRuleset(ctx, rulesetId)
	if err != nil {
		errStr := fmt.Errorf("error while getting state, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	// Cashback generation logic
	cashback := (transaction.Value * ruleset.CashbackPercentage) / 100
	if cashback > ruleset.MaxCashbackLimit {
		// If percentage cashback value exceeds
		// max limit, set cashback to max limit
		cashback = ruleset.MaxCashbackLimit
	}

	// Get cashback token
	cashbackToken := CreateCashbackToken(
		ctx,
		cashback,
		transaction.TxnId,
		userWallet,
		ruleset.CashbackExpirationTime,
		rulesetId,
	)

	// Claim ruleset
	_, err = ClaimRuleset(
		ctx,
		transaction.TxnId,
		rulesetId,
	)
	if err != nil {
		errStr := fmt.Errorf("error while claiming ruleset, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	// Store token in public state
	err = utils.PutState(ctx, cashbackToken.ID, cashbackToken)
	if err != nil {
		errStr := fmt.Errorf("error while putting state, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	err = utils.SetEvent(ctx, utils.CASHBACK_GENERATED_EVENT, cashbackToken.ID)
	if err != nil {
		errStr := fmt.Errorf("error while setting event, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	fmt.Printf("CashbackContract.GenerateCashback :: Cashback generated for transaction %s",
		transaction.TxnId)

	return cashbackToken, nil
}

func (cc *CashbackContract) ExpireCashback(
	ctx contractapi.TransactionContextInterface,
	cashbackTokenId string,
) (bool, error) {
	fmt.Printf("CashbackContract.ExpireCashback :: Expiring cashback on ID %s", cashbackTokenId)

	// Fetch cashbackToken details
	cashbackToken, err := FetchCashbackToken(ctx, cashbackTokenId)
	if err != nil {
		errStr := fmt.Errorf("error while getting state, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	if cashbackToken.Status != utils.STATUS_ACTIVE {
		errStr := fmt.Errorf("cashback already claimed or expired")
		fmt.Println(errStr)
		return true, nil
	}

	cashbackToken.Status = utils.STATUS_EXPIRED

	// Store data in public state
	err = utils.PutState(ctx, cashbackToken.ID, cashbackToken)
	if err != nil {
		errStr := fmt.Errorf("error while putting state, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	err = utils.SetEvent(ctx, utils.CASHBACK_EXPIRED_EVENT, cashbackToken.ID)
	if err != nil {
		errStr := fmt.Errorf("error while setting event, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	fmt.Printf("RulesetContract.ExpireRuleset :: Expired cashback on ID %s", cashbackTokenId)

	return true, nil
}

func ClaimCashback(
	ctx contractapi.TransactionContextInterface,
	transactionId string,
	cashbackId string,
	userWallet string,
) (*models.CashbackToken, error) {
	fmt.Printf("CashbackContract.ClaimCashback :: Claiming cashback on transaction ID %s",
		transactionId)

	// Fetch cashback token on ID
	cashbackToken, err := FetchCashbackToken(
		ctx,
		cashbackId,
	)
	if err != nil {
		errStr := fmt.Errorf("error while getting cashback token, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	// Check if cashback is valid and not claimed
	if cashbackToken.Status != utils.STATUS_ACTIVE {
		errStr := fmt.Errorf("cashback token cannot be applied")
		fmt.Println(errStr)
		return nil, errStr
	}

	// Update cashback token status to claimed
	cashbackToken.Status = utils.STATUS_CLAIMED
	cashbackToken.ClaimedTxnID = transactionId

	// Update token in public state
	err = utils.PutState(ctx, cashbackToken.ID, cashbackToken)
	if err != nil {
		errStr := fmt.Errorf("error while putting state, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	err = utils.SetEvent(ctx, utils.CASHBACK_CLAIMED_EVENT, cashbackToken.ID)
	if err != nil {
		errStr := fmt.Errorf("error while setting event, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	fmt.Printf("CashbackContract.ClaimCashback :: Claimed cashback on transaction ID %s",
		transactionId)

	return cashbackToken, nil
}

func CreateCashbackToken(
	ctx contractapi.TransactionContextInterface,
	cashback float64,
	transactionId string,
	userWallet string,
	cashbackExpirationTime int64,
	rulesetId string,
) *models.CashbackToken {
	fmt.Printf("CashbackContract.CreateCashbackToken :: Creating cashback token")

	currentTime := time.Now()
	// Create cashback token
	cashbackToken := models.CashbackToken{
		DocType:      utils.DOCTYPE_CASHBACK,
		ID:           uuid.New().String(),
		Value:        cashback,
		CreationTime: currentTime.Format(time.RFC3339),
		UserWallet:   userWallet,
		ExpirationTime: currentTime.Add(
			time.Hour * 24 * time.Duration(
				cashbackExpirationTime)).Format(time.RFC3339),
		Status:       utils.STATUS_ACTIVE,
		TxnID:        transactionId,
		RulesetID:    rulesetId,
		ClaimedTxnID: "",
	}

	fmt.Printf("CashbackContract.CreateCashbackToken :: Created cashback token with id %s", cashbackToken.ID)

	return &cashbackToken
}

func (cc *CashbackContract) QueryCashbackToken(
	ctx contractapi.TransactionContextInterface,
	cashbackTokenId string,
) (*models.CashbackToken, error) {
	fmt.Printf("CashbackContract.QueryCashbackToken :: Querying cashback token on ID %s", cashbackTokenId)

	cashbackToken, err := FetchCashbackToken(ctx, cashbackTokenId)
	if err != nil {
		errStr := fmt.Errorf("error while getting state, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	fmt.Printf("CashbackContract.QueryCashbackToken :: Queried cashback token details on ID %s", cashbackTokenId)

	return cashbackToken, nil
}

func (cc *CashbackContract) QueryAllCashbackTokens(
	ctx contractapi.TransactionContextInterface,
	userWallet string,
) ([]string, error) {
	fmt.Printf("CashbackContract.QueryAllCashbackTokens :: Querying all cashback tokens")

	queryString := fmt.Sprintf(`{"selector":{"docType":"%s","userWallet":"%s"}}`, utils.DOCTYPE_CASHBACK, userWallet)

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

	fmt.Printf("CashbackContract.QueryAllCashbackTokens :: Fetched all cashback tokens")

	return data, nil
}

func FetchCashbackToken(
	ctx contractapi.TransactionContextInterface,
	cashbackTokenId string,
) (*models.CashbackToken, error) {
	fmt.Printf("CashbackContract.FetchCashbackToken :: Fetching cashback token on ID %s", cashbackTokenId)

	cashbackTokenStr, err := utils.GetState(ctx, cashbackTokenId)
	if err != nil {
		errStr := fmt.Errorf("error while getting state, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	var cashbackToken models.CashbackToken
	err = json.Unmarshal(cashbackTokenStr, &cashbackToken)
	if err != nil {
		errStr := fmt.Errorf("error while unmarshalling data: %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	fmt.Printf("CashbackContract.FetchCashbackToken :: Fetched cashback token on ID %s", cashbackTokenId)

	return &cashbackToken, nil
}
