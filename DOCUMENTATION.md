# Dripnex Documentation

## Architecture Overview

Dripnex is a Next.js application using the App Router. Web3 support is provided through Wagmi and RainbowKit inside `Web3Wrapper`. Components live under `src/components` and application pages live under `src/app`.

## Web3 Handling

Wallet connections are handled via Wagmi connectors configured in `src/lib/wallet.ts`. For sending transactions across networks the app exposes a network provider abstraction in `src/lib/networks`. Hooks such as `useSendTransactionWithGas` leverage this to estimate gas and send transactions on the selected chain.

## Adding a New Network

1. Edit `src/lib/networks/index.ts` and add an entry with chain information and explorer URL.
2. Use the new key in forms or hooks to allow users to select the network.

## Running the App

```bash
npm install
npm run dev
```

## Running Tests

```bash
npm test
```

Vitest will execute the unit and integration tests located under `src/**/__tests__`.
