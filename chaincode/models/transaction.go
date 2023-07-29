package models

type Transaction struct {
	DocType           string  `json:"docType"`
	TxnId             string  `json:"txnId"`
	Value             float64 `json:"value"`
	TimeStamp         string  `json:"timeStamp"`
	Sender            string  `json:"sender"`
	SenderAddress     string  `json:"senderAddress"`
	Receiver          string  `json:"receiver"`
	ReceiverAddress   string  `json:"receiverAddress"`
	CashbackUsedValue float64 `json:"cashbackUsedValue"`
}
