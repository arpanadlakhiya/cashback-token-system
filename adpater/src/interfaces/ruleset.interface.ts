
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
  