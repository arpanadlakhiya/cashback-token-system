
export interface RuleSet {
  docType: string;
  ruleId: string;
  status: string;
  min_txn_limit: number;
  max_cashback_limit: number;
  cashback_percentage: number;
  creation_time: string;
  expiration_time: string;
  cashback_expiration_time: string;
  user_wallet: string;
}
export interface claimRuleset {
  transactionId: string,
  rulesetId: string,
}