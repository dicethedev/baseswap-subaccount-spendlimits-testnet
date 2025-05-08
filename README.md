# BaseSwap - Base Builder Quest 5 Submission

## No-Popup Transactions with Smart Wallet Sub Accounts and Spend Limits

**BaseSwap** demonstrates how to leverage **Base's Smart Wallet Sub Accounts** and **Spend Limits** to create a seamless user experience where transactions can be executed without authentication popups.

![Image](https://github.com/user-attachments/assets/e7977883-756c-424d-a3b8-0c9b794d8e22)

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
2. **Send Transactions**: Users can send transactions through these sub-accounts without needing to approve each transaction.
3. **Base SubAccounts Module**: The application uses the SubAccounts Module from Base, which is currently available only on **Base Sepolia Testnet**. Uses [Base SubAccounts Module](https://docs.base.org/identity/smart-wallet/guides/spend-limits)

## Running Locally

1. **Clone this repository**:

   ```bash
   git clone https://github.com/dicethedev/baseswap-subaccount-spendlimits-testnet.git
   cd baseswap-subaccount-spendlimits-testnet

   npm install

   Create a .env file and use it for the environment.

   copy and paste this .env.example to your .env -

   # Chech base spend limits docs for more info - https://docs.base.org/identity/smart-wallet/guides/spend-limits
   SPENDER_PRIVATE_KEY=""
   NEXT_PUBLIC_SPENDER_ADDRESS=""

   npm run dev

   ```
