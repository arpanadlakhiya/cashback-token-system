<<<<<<< HEAD

export interface ruleSet {
    ruleId : string,
        status: string,
        min_txn_limit : number,
        max_cashback_limit: number,
        cashback_percentage: number,
        creation_time: Date,
        expiration_time: Date,
        cashback_expiration_time:   Date
  }
  export interface claimRuleset {
    transactionId: string,
    rulesetId: string,
  }
=======
export interface RuleSet {
  docType: string;
  ruleId: string;
  status: string;
  min_txn_limit: number;
  max_cashback_limit: number;
  cashback_percentage: number;
  creation_time: Date;
  expiration_time: Date;
  cashback_expiration_time: Date;
}
>>>>>>> adabaf2b5bd51747b6eeaee124d453074c1499f2
