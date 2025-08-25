# Cashback Token System

A blockchain-based cashback token system built on Hyperledger Fabric to provide automated cashback rewards on CBDC (Central Bank Digital Currency) transactions. This system enables businesses to offer cashback incentives while maintaining transparency, security, and immutability through distributed ledger technology.

## 🏗️ Architecture Overview

The system consists of three main components:

- **Blockchain Layer**: Hyperledger Fabric chaincode written in Go
- **Backend API**: Node.js/TypeScript adapter service with REST APIs
- **Frontend**: Angular-based web application for user interaction


## 🚀 Features

- **Automated Cashback Generation**: Automatic cashback calculation based on transaction rules
- **Flexible Ruleset Management**: Configurable cashback percentages and limits
- **Real-time Transaction Processing**: Event-driven architecture for immediate cashback generation
- **Secure Wallet Management**: Cryptographically secure user wallet operations
- **Token Expiration Management**: Automated handling of cashback token expiration
- **Multi-user Support**: Admin and user role-based access control
- **Transaction History**: Complete audit trail of all transactions and cashback operations

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: Apache Cassandra/ScyllaDB
- **Authentication**: JWT with bcrypt
- **Blockchain**: Hyperledger Fabric SDK

### Frontend
- **Framework**: Angular 15
- **UI Library**: Bootstrap 5
- **Icons**: Bootstrap Icons
- **State Management**: RxJS

### Blockchain
- **Platform**: Hyperledger Fabric
- **Language**: Go 1.20
- **Smart Contracts**: Fabric Contract API
- **Consensus**: Raft (configurable)

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Go** 1.20+
- **Docker** and Docker Compose
- **Hyperledger Fabric** 2.2+
- **Apache Cassandra** or **ScyllaDB**
- **Angular CLI** 15+

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cashback-token-system
```

### 2. Start Prerequisites

```bash
cd deployment
./start_all_prereq.sh
```

This script will:
- Start the Hyperledger Fabric network
- Initialize the blockchain environment
- Set up the database
- Configure certificates and environment variables

### 3. Start All Components

```bash
./start_all_component.sh
```

This will start:
- The backend API service
- The frontend application
- All required middleware services

### 4. Access the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **Blockchain Explorer**: http://localhost:8080

## 🔧 Development Setup

### Backend Development

```bash
cd adapter
npm install
npm run build
npm run start-api
```

### Frontend Development

```bash
cd frontend
npm install
ng serve
```

### Chaincode Development

```bash
cd chaincode
go mod tidy
go mod vendor
```

## 📚 API Documentation

### Core Endpoints

#### User Management
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User authentication
- `GET /api/user/profile` - Get user profile

#### Transaction Management
- `POST /api/transaction/process` - Process a new transaction
- `GET /api/transaction/history` - Get transaction history
- `GET /api/transaction/:id` - Get specific transaction

#### Cashback Operations
- `POST /api/cashback/generate` - Generate cashback for transaction
- `GET /api/cashback/user/:wallet` - Get user's cashback tokens
- `POST /api/cashback/claim` - Claim cashback tokens
- `POST /api/cashback/expire` - Expire cashback tokens

#### Ruleset Management
- `POST /api/ruleset/create` - Create new cashback ruleset
- `GET /api/ruleset/list` - List all rulesets
- `PUT /api/ruleset/:id` - Update ruleset
- `DELETE /api/ruleset/:id` - Delete ruleset


## 🔐 Smart Contracts

### Cashback Contract
The main smart contract that handles:
- Cashback token generation
- Token expiration
- Token claiming
- Balance management

### Ruleset Contract
Manages cashback rules including:
- Rule creation and modification
- Rule validation
- Rule expiration

### Transaction Simulator
Provides testing and simulation capabilities for:
- Transaction processing
- Cashback calculation
- Event generation

## 🗄️ Database Schema

The system uses Apache Cassandra/ScyllaDB with the following key tables:
- `users` - User information and wallet details
- `transactions` - Transaction records
- `cashback_tokens` - Cashback token storage
- `rulesets` - Cashback rules configuration

## 🚀 Deployment

### Docker Deployment

```bash
cd deployment/cashbackplatform
docker-compose -f deployment/docker-compose-api.yaml up -d
docker-compose -f deployment/docker-compose-middleware.yaml up -d
```

### Production Considerations

- Use proper SSL certificates
- Configure firewall rules
- Set up monitoring and logging
- Implement backup strategies
- Use production-grade Hyperledger Fabric network

## 🧪 Testing

### Backend Testing
```bash
cd adapter
npm test
```

### Frontend Testing
```bash
cd frontend
ng test
```

### Chaincode Testing
```bash
cd chaincode
go test ./...
```

## 📁 Project Structure

```
cashback-token-system/
├── adapter/                 # Backend API service
│   ├── src/
│   │   ├── api/           # REST API endpoints
│   │   ├── interfaces/    # TypeScript interfaces
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   └── package.json
├── chaincode/              # Hyperledger Fabric smart contracts
│   ├── smartcontracts/    # Go smart contracts
│   ├── models/            # Data models
│   └── utils/             # Utility functions
├── frontend/               # Angular web application
│   ├── src/
│   │   ├── app/          # Angular components
│   │   └── assets/       # Static assets
│   └── package.json
├── deployment/             # Deployment scripts and configs
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

