package models

type Wallet struct {
	DocType      string `json:"docType"`
	ID           string `json:"id"`
	Address      string `json:"address"`
	CreationTime string `json:"creationTime"`
	Status       string `json:"status"`
	Username     string `json:"username"`
}
