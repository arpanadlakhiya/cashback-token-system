package models

type CashbackToken struct {
	DocType        string  `json:"docType"`
	ID             string  `json:"id"`
	Value          float64 `json:"value"`
	CreationTime   string  `json:"creationTime"`
	UserWallet     string  `json:"userWallet"`
	ExpirationTime string  `json:"expirationTime"`
	Status         string  `json:"status"`
	TxnID          string  `json:"txnId"`
	RulesetID      string  `json:"rulesetId"`
	ClaimedTxnID   string  `json:"claimedTxnId"`
}
