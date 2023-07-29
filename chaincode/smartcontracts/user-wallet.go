package smartcontracts

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/cashback-token-system/chaincode/models"
	"github.com/cashback-token-system/chaincode/utils"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type UserWallet struct {
	contractapi.Contract
}

func (wc *UserWallet) Register(
	ctx contractapi.TransactionContextInterface,
	wallet models.Wallet,
) (bool, error) {
	fmt.Printf("UserWallet.Register :: Wallet registration started for ID %s", wallet.ID)

	// verify all wallet details
	err := validateWallet(ctx, &wallet)
	if err != nil {
		errStr := fmt.Errorf("error while validating wallet, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	// Putstate on ledger
	err = utils.PutState(ctx, wallet.ID, wallet)
	if err != nil {
		errStr := fmt.Errorf("error while putting state, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	err = utils.SetEvent(ctx, utils.WALLET_REGISTRATION_EVENT, wallet.ID)
	if err != nil {
		errStr := fmt.Errorf("error while setting event, %v", err.Error())
		fmt.Println(errStr)
		return false, errStr
	}

	fmt.Printf("UserWallet.Register :: Wallet registration completed for ID %s", wallet.ID)

	return true, nil
}

func (wc *UserWallet) QueryAll(
	ctx contractapi.TransactionContextInterface) ([]string, error) {
	fmt.Printf("UserWallet.QueryAll :: Querying all wallets")

	queryString := fmt.Sprintf(`{"selector":{"docType":"%s"}}`, utils.DOCTYPE_WALLET)

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

	fmt.Printf("UserWallet.QueryAll :: Fetched all wallets")

	return data, nil
}

func (wc *UserWallet) QueryByAddress(
	ctx contractapi.TransactionContextInterface,
	address string,
	signature string,
) (*models.Wallet, error) {
	fmt.Printf("UserWallet.QueryByAddress :: Querying wallet by address %s", address)

	return GetWalletByAddress(ctx, address)
}

func GetWalletByAddress(
	ctx contractapi.TransactionContextInterface,
	address string,
) (*models.Wallet, error) {
	query := fmt.Sprintf(`{"selector":{"docType":"wallet","address":"%s"}}`, address)

	res, err := ctx.GetStub().GetQueryResult(query)
	if err != nil {
		return nil, fmt.Errorf("error while getting wallets from public state. Error: %w", err)
	}

	defer res.Close()

	if !res.HasNext() {
		return nil, fmt.Errorf("wallet %w for address: %s", utils.ErrNotExist, address)
	}

	return extractWallet(res)
}

// ------------------  Private functions ----------------------------

func validateWallet(ctx contractapi.TransactionContextInterface, wallet *models.Wallet) error {
	// verify ID is not null or empty
	if wallet.ID == "" {
		return fmt.Errorf("ID cannot be empty")
	}

	// verify address is not null or empty
	if wallet.Address == "" {
		return fmt.Errorf("address cannot be empty")
	}

	// verify address is not null or empty
	if wallet.CreationTime == "" {
		return fmt.Errorf("creation time cannot be empty")
	}

	// verify address is not null or empty
	if wallet.Username == "" {
		return fmt.Errorf("username cannot be empty")
	}

	// verify wallet with same ID does not exist
	err := utils.VerifyStateDoesNotExist(ctx, wallet.ID)
	if err != nil {
		return fmt.Errorf("wallet exits %w", err)
	}

	// verify wallet with same address does not exist
	existingWallet, err := GetWalletByAddress(ctx, wallet.Address)

	if err != nil && !errors.Is(err, utils.ErrNotExist) {
		return fmt.Errorf("error while checking for existing wallet with address %s. WalletId: %s, error: %w",
			wallet.Address, wallet.ID, err)
	} else if existingWallet != nil {
		return fmt.Errorf("wallet %w with address %s. Id: %s", utils.ErrAlreadyRegistered, wallet.Address, wallet.ID)
	}

	return nil
}

func extractWallet(resultsIterator shim.StateQueryIteratorInterface) (*models.Wallet, error) {
	queryResult, err := resultsIterator.Next()
	if err != nil {
		return nil, fmt.Errorf("error while getting Wallet from World state. Error: %w", err)
	}

	var wallet models.Wallet
	err = json.Unmarshal(queryResult.Value, &wallet)

	if err != nil {
		return nil, fmt.Errorf("error while unmarshalling Wallet from World state. Error: %w", err)
	}

	return &wallet, nil
}
