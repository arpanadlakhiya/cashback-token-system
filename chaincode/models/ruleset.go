package models

type Ruleset struct {
	DocType                string  `json:"docType"`
	RulesetId              string  `json:"ruleId"`
	Status                 string  `json:"status"`
	MinTxnLimit            float64 `json:"min_txn_limit"`
	MaxCashbackLimit       float64 `json:"max_cashback_limit"`
	CashbackPercentage     float64 `json:"cashback_percentage"`
	CreationTime           string  `json:"creation_time"`
	ExpirationTime         string  `json:"expiration_time"`
	CashbackExpirationTime int64   `json:"cashback_expiration_time"`
}
