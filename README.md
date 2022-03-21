# near-nft-subspace-storage

# Quick Start

To run this project locally:

1. Prerequisites: Make sure you've installed [Node.js] ≥ 12
2. Install dependencies: `yarn install`
3. Run the local development server: `yarn dev` (see `package.json` for a
   full list of `scripts` you can run with `yarn`)

Now you'll have a local development environment backed by the NEAR TestNet!

# Exploring The Code

1. The "backend" code lives in the `/contract` folder. See the README there for
   more info.
2. The frontend code lives in the `/src` folder. `/src/index.html` is a great
   place to start exploring. Note that it loads in `/src/index.js`, where you
   can learn how the frontend connects to the NEAR blockchain.

# Deploy

Every smart contract in NEAR has its [own associated account][near accounts]. When you run `yarn dev`, your smart contract gets deployed to the live NEAR TestNet with a throwaway account. When you're ready to make it permanent, here's how.

## Step 0: Install near-cli (optional)

[near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain. It was installed to the local `node_modules` folder when you ran `yarn install`, but for best ergonomics you may want to install it globally:

    yarn install --global near-cli

Or, if you'd rather use the locally-installed version, you can prefix all `near` commands with `npx`

Ensure that it's installed with `near --version` (or `npx near --version`)

## Step 1: Create an account for the contract

Each account on NEAR can have at most one contract deployed to it.

1. Create a new testnet wallet and accountId https://wallet.testnet.near.org/create

If you've already created an account such as `MY_NAME.testnet`, you can deploy your contract to `near-nft-subspace-storage.MY_NAME.testnet`.

Assuming you've already created an account on [NEAR Wallet], here's how to create a subaccount for this app `near-nft-subspace-storage.MY_NAME.testnet`:

2. Authorize NEAR CLI, following the commands it gives you:

   near login

3. Create a subaccount (replace `MY_NAME` below with your actual account name):

   near create-account near-nft-subspace-storage.MY_NAME.testnet --masterAccount MY_NAME.testnet

## Step 2: set contract name in code

Update `src/config.js` to deploy the contract using the generated sub account:

    const CONTRACT_NAME = "near-nft-subspace-storage.MY_NAME.testnet";

## Step 3: deploy!

Builds & deploys smart contract to NEAR TestNet

    yarn deploy

## Step 4: Using the app.

App is running, and the NFT contract is deployed to the network.

    yarn start
