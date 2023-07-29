package utils

const (
	DOCTYPE_CASHBACK = "cashback"
	DOCTYPE_RULESET  = "ruleset"
	DOCTYPE_TXN      = "transaction"
	DOCTYPE_WALLET   = "wallet"

	TXN_TRANSIENT     = "transaction"
	RULESET_TRANSIENT = "ruleset"

	STATUS_ACTIVE  = "ACTIVE"
	STATUS_CLAIMED = "CLAIMED"
	STATUS_EXPIRED = "EXPIRED"

	WALLET_REGISTRATION_EVENT = "RegisterWallet"

	CASHBACK_GENERATED_EVENT = "CashbackGenerated"
	CASHBACK_EXPIRED_EVENT   = "CashbackExpired"
	CASHBACK_CLAIMED_EVENT   = "CashbackClaimed"

	RULESET_CREATED_EVENT = "RulesetCreated"
	RULESET_EXPIRED_EVENT = "RulesetExpired"
	RULESET_CLAIMED_EVENT = "RulesetClaimed"

	TXN_SIMULATED_EVENT = "TransactionSimulated"
)
