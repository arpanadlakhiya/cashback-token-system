# LOCAL_IP=$(hostname -i | awk '{print $1}')
LOCAL_IP=$(ip a | grep 192.168 | awk '{ print $2 }' | head -n 1 | cut -d '/' -f 1)

HLF_NW_IP=$LOCAL_IP

# name of the org - should match with org name in HLF
ORG_NAME=cashbackplatform

# port where CA for this org runs
CA_PORT=7000

# port where peer for this org runs
PEER_PORT=7001

# port where orderer is running
ORDERER_PORT=7003

#Port where orgs API listens
API_PORT=7016

# write to .env file
cat <<EOF > api.env
# used only in dev docker-compose
ORG_ENV_FILE=api.env
HLF_NW_IP=$HLF_NW_IP

# Fabric related configs
FABRIC_ADMIN_USER=admin
FABRIC_ADMIN_PASSWORD=adminpw
ADMIN_WALLET_PATH=./wallet/admin/

CLIENT_USER_ID=user10
USER_WALLET_PATH=./wallet/user/

DLT_CHANNEL_NAME=mychannel
FABRIC_CONTRACT_NAME=cashback-token-system

MSP_ID=$ORG_NAME              
ORG_NAME=$ORG_NAME

CA_ORG=ca1
CAPEM=./certs/ca/ca.crt
CA_URL=https://ca1.$ORG_NAME:$CA_PORT

PEER_LIST=peer0.$ORG_NAME
PEERPEM=./certs/peer/ca.crt
PEER_URL=grpcs://peer0.$ORG_NAME:$PEER_PORT

ORDERER_LIST=orderer0.orderer
ORDERERPEM=./certs/orderer/ca.crt
ORDERER_URL=grpcs://orderer0.orderer:${ORDERER_PORT}

NETWORK_CONFIG=./network-config/connection-profile.json

API_PORT=$API_PORT

# API config
BASE_URL=api/

# USER AUTHENTICATION
USER_AUTHENTICATION_JWT_TOKEN_KEY=T5vPmpnc8N
USER_AUTHENTICATION_JWT_EXPIRATION=15m

SCYLLA_CONTACT_POINTS=$ORG_NAME-scylla
SCYLLA_DATACENTER=DC1
SCYLLA_KEYSPACE=cbdc
SCYLLA_USERNAME=admin
SCYLLA_PWD=adminpw

EOF
