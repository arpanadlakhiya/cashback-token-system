package smartcontracts

import (
	"encoding/json"
	"fmt"

	"github.com/cashback-token-system/chaincode/models"
	"github.com/cashback-token-system/chaincode/utils"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type RulesetContract struct {
	contractapi.Contract
}

func (rc *RulesetContract) CreateRuleset(
	ctx contractapi.TransactionContextInterface,
) (bool, error) {
	fmt.Printf("RulesetContract.CreateRuleset :: Creating ruleset")

	// Get data from transient
	rulesetTransient, err := utils.GetTransientData(ctx, utils.RULESET_TRANSIENT)
	if err != nil {
		errStr := fmt.Errorf("error while getting transient data: %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	// Unmarshall data to model
	var ruleset models.Ruleset
	err = json.Unmarshal(rulesetTransient, &ruleset)
	if err != nil {
		errStr := fmt.Errorf("error while unmarshalling data: %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	ruleset.Status = utils.STATUS_ACTIVE

	// Store data in public state
	err = utils.PutState(ctx, ruleset.RulesetId, ruleset)
	if err != nil {
		errStr := fmt.Errorf("error while putting state, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	err = utils.SetEvent(ctx, utils.RULESET_CREATED_EVENT, ruleset.RulesetId)
	if err != nil {
		errStr := fmt.Errorf("error while setting event, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	fmt.Printf("RulesetContract.CreateRuleset :: Created ruleset successfully with ID: %v", ruleset.RulesetId)

	return true, nil
}

func (rc *RulesetContract) ExpireRuleset(
	ctx contractapi.TransactionContextInterface,
	rulesetId string,
) (bool, error) {
	fmt.Printf("RulesetContract.ExpireRuleset :: Expiring ruleset on ID %s", rulesetId)

	// Fetch ruleset details
	ruleset, err := FetchRuleset(ctx, rulesetId)
	if err != nil {
		errStr := fmt.Errorf("error while getting state, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	if ruleset.Status != utils.STATUS_ACTIVE {
		errStr := fmt.Errorf("ruleset already claimed or expired")
		fmt.Println(errStr)
		return true, nil
	}

	ruleset.Status = utils.STATUS_EXPIRED

	// Store data in public state
	err = utils.PutState(ctx, ruleset.RulesetId, ruleset)
	if err != nil {
		errStr := fmt.Errorf("error while putting state, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	err = utils.SetEvent(ctx, utils.RULESET_EXPIRED_EVENT, ruleset.RulesetId)
	if err != nil {
		errStr := fmt.Errorf("error while setting event, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	fmt.Printf("RulesetContract.ExpireRuleset :: Expired ruleset on ID %s", rulesetId)

	return true, nil
}

func ClaimRuleset(
	ctx contractapi.TransactionContextInterface,
	transactionId string,
	rulesetId string,
) (*models.Ruleset, error) {
	fmt.Printf("RulesetContract.ClaimRuleset :: Claiming ruleset on ID %s", rulesetId)

	// Fetch ruleset details
	ruleset, err := FetchRuleset(ctx, rulesetId)
	if err != nil {
		errStr := fmt.Errorf("error while getting state, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	if ruleset.Status != utils.STATUS_ACTIVE {
		errStr := fmt.Errorf("ruleset already claimed or expired")
		fmt.Println(errStr)
		return ruleset, nil
	}

	// Update cashback token status to claimed
	ruleset.Status = utils.STATUS_CLAIMED

	// Update token in public state
	err = utils.PutState(ctx, ruleset.RulesetId, ruleset)
	if err != nil {
		errStr := fmt.Errorf("error while putting state, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	err = utils.SetEvent(ctx, utils.RULESET_CLAIMED_EVENT, ruleset.RulesetId)
	if err != nil {
		errStr := fmt.Errorf("error while setting event, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	fmt.Printf("RulesetContract.ClaimRuleset :: Claimed ruleset on ID %s", rulesetId)

	return ruleset, nil
}

func (rc *RulesetContract) QueryRuleset(
	ctx contractapi.TransactionContextInterface,
	rulesetId string,
) (*models.Ruleset, error) {
	fmt.Printf("RulesetContract.QueryRuleset :: Querying ruleset on ID %s", rulesetId)

	ruleset, err := FetchRuleset(ctx, rulesetId)
	if err != nil {
		errStr := fmt.Errorf("error while getting state, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	fmt.Printf("RulesetContract.QueryRuleset :: Queried ruleset details on ID %s", rulesetId)

	return ruleset, nil
}

func (rc *RulesetContract) QueryAllRulesets(
	ctx contractapi.TransactionContextInterface,
) ([]string, error) {
	fmt.Printf("RulesetContract.QueryAllRulesets :: Querying all rulesets")

	queryString := fmt.Sprintf(`{"selector":{"docType":"%s"}}`, utils.DOCTYPE_RULESET)

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

	fmt.Printf("RulesetContract.QueryAllRulesets :: Fetched all rulesets")

	return data, nil
}

func FetchRuleset(
	ctx contractapi.TransactionContextInterface,
	rulesetId string,
) (*models.Ruleset, error) {
	fmt.Printf("RulesetContract.FetchRuleset :: Fetching ruleset data on ID %s", rulesetId)

	rulesetStr, err := utils.GetState(ctx, rulesetId)
	if err != nil {
		errStr := fmt.Errorf("error while getting state, %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	var ruleset models.Ruleset
	err = json.Unmarshal(rulesetStr, &ruleset)
	if err != nil {
		errStr := fmt.Errorf("error while unmarshalling data: %v", err.Error())
		fmt.Println(errStr)
		return nil, errStr
	}

	fmt.Printf("RulesetContract.FetchRuleset :: Fetched ruleset details on ID %s", rulesetId)

	return &ruleset, nil
}
