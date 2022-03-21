# NFT Smart Contract

A [smart contract] written in [Rust] using TokenMetadata to store extra information.

- **TokenMetadata.extra**: Contain an stringified JSON that represent an file object uploaded to the subspace network, in a similar to IPFS.

This MVP integration can be used as an optional storage layer that store and backup NFT asset, file or metadata using the Subspace Network storage API.

# Quick Start

Before you compile this code, you will need to install Rust with [correct target]

# Exploring The Code

1. The main smart contract code lives in `src/lib.rs`. You can compile it with
   the `./compile` script.
2. Tests: You can run smart contract tests with the `./test` script. This runs
   standard Rust tests using [cargo] with a `--nocapture` flag so that you
   can see any debug info you print to the console.

More information: https://github.com/near-examples/nft-tutorial
