export interface Transaction {
	docType: string
	txnId: string
	value: number,
	timeStamp: string
	senderAddress: string
	receiverAddress: string
	cashbackUsedValue: number
}