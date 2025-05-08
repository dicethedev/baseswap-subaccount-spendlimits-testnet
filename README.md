# BaseSwap - Base Builder Quest 5 Submission

## No-Popup Transactions with Smart Wallet Sub Accounts and Spend Limits

**BaseSwap** demonstrates how to leverage **Base's Smart Wallet Sub Accounts** and **Spend Limits** to create a seamless user experience where transactions can be executed without authentication popups.

![SilentSpend](path-to-image)

## Features

- **Connect your Base Sepolia wallet** - Connect and automatically switch to the Base Sepolia network.
- **Create Sub Accounts with Spend Limits** - Set up daily and per-transaction limits for secure transactions.
- **Execute transactions without popups** - Send ETH without seeing a confirmation dialog.
- **Live transaction tracking** - View your successful transactions with links to BaseScan.

## Technology Stack

- **Frontend**: NextJS for the user interface
- **Ethereum Interactions**: Wagmi/Viem for interacting with the Ethereum blockchain
- **Base SDK**: Base Smart Wallet SubAccounts SDK

## How It Works

1. **Connect Wallet**: Users connect their wallet to the dApp (only needed once).
2. **Send Transactions**: Users can send transactions through these Sub Accounts without needing to approve each transaction.
3. **Base SubAccounts Module**: The application uses the SubAccounts Module from Base, which is currently available only on **Base Sepolia Testnet**.

## Running Locally

1. **Clone this repository**:
   ```bash
   git clone https://github.com/your-username/silentspend.git
   ```
