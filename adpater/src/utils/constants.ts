// HLF parameters
export const contractName = process.env.FABRIC_CONTRACT_NAME
  ? process.env.FABRIC_CONTRACT_NAME
  : "cashback-token-system";
export const dltEventcommitTimeout = process.env.DLT_EVENT_COMMIT_TIMEOUT
  ? process.env.DLT_EVENT_COMMIT_TIMEOUT
  : 500;
export const dltEventEndorseTimeout = process.env.DLT_EVENT_ENDORSE_TIMEOUT
  ? process.env.DLT_EVENT_ENDORSE_TIMEOUT
  : 500;
export const grpcKeepAliveTimeout = process.env.GRPC_KEEPALIVE_TIMEOUT
  ? process.env.GRPC_KEEPALIVE_TIMEOUT
  : 180000;

// Auth middleware
export const JWT_KEY = process.env.USER_AUTHENTICATION_JWT_TOKEN_KEY
  ? process.env.USER_AUTHENTICATION_JWT_TOKEN_KEY
  : "";
export const JWT_EXPIRATION = process.env.USER_AUTHENTICATION_JWT_EXPIRATION
  ? process.env.USER_AUTHENTICATION_JWT_EXPIRATION
  : "";

// Chaincode envs
export const WALLET_KEYSTORE = process.env.WALLET_KEYSTORE;
export const HD_WALLET_PASSPHRASE = process.env.HD_WALLET_PASSPHRASE;

// Doctypes
export const DOCTYPE_CASHBACK = "cashback";
export const DOCTYPE_RULESET = "ruleset";
export const DOCTYPE_TXN = "transaction";
export const DOCTYPE_WALLET = "wallet";

// Transient keys
export const TXN_TRANSIENT = "transaction";
export const RULESET_TRANSIENT = "ruleset";

// Status
export const STATUS_ACTIVE = "ACTIVE";
export const STATUS_CLAIMED = "CLAIMED";
export const STATUS_EXPIRED = "EXPIRED";

// Chaincode functions
export const REGISTER_WALLET = "UserWallet:Register";
export const CREATE_RULESET = "RulesetContract:CreateRuleset";
export const SIMULATE_TRANSACTION = "TransactionSimulator:SimulateTransaction";
export const QUERY_CASHBACK_TOKENS = "CashbackContract:QueryAllCashbackTokens";

// Events
export const WALLET_REGISTRATION_EVENT = "RegisterWallet";

export const CASHBACK_GENERATED_EVENT = "CashbackGenerated";
export const CASHBACK_EXPIRED_EVENT = "CashbackExpired";
export const CASHBACK_CLAIMED_EVENT = "CashbackClaimed";

export const RULESET_CREATED_EVENT = "RulesetCreated";
export const RULESET_EXPIRED_EVENT = "RulesetExpired";
export const RULESET_CLAIMED_EVENT = "RulesetClaimed";

export const TXN_SIMULATED_EVENT = "TransactionSimulated";
