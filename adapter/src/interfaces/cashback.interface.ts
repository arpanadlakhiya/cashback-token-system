export interface CashbackDetails {
  docType: string;
	id: string;
	value: number;
	creationTime: string;
	userWallet: string;
	expirationTime: string;
	status: string;
	txnId: string;
	rulesetId: string;
	claimedTxnId: string;
}

export interface CashbackTrimmed {
	id: string;
	value: number;
}

export interface AllCashback {
	totalAmount: number;
	cashbackTokens: CashbackTrimmed[];
}