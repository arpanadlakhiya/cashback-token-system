export interface PreTransaction {
	value: number
}

export interface Transaction {
	docType: string;
	txnId: string;
	value: number;
	timeStamp: string;
	sender: string;
  senderAddress: string;
	receiver: string;
  receiverAddress: string;
	cashbackUsedValue: number;
}