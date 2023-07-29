package models

type Transaction struct {
	DocType           string  `json:"docType"`
	TxnId             string  `json:"txnId"`
	Value             float64 `json:"value"`
	TimeStamp         string  `json:"timeStamp"`
	SenderAddress     string  `json:"senderAddress"`
	ReceiverAddress   string  `json:"receiverAddress"`
	CashbackUsedValue float64 `json:"cashbackUsedValue"`
}
