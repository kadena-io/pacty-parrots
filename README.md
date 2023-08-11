# Welcome to Pacty Parrots!!

## How to play:
1. Install the [Chainweaver desktop app](https://docs.kadena.io/basics/chainweaver/chainweaver-user-guide)
2. Fund your account in the [testnet faucet](https://faucet.testnet.chainweb.com/)
3. Transfer your funds from **Chain 1** to **Chain 0** using the Chainweaver Wallet and [the xChain transfer tool](https://transfer.chainweb.com/xchain.html)
  - [Tutorial for xChain](https://medium.com/@kitty.kad.token/using-chainweaver-for-cross-chain-transfers-no-download-needed-5792f2ca430b)
4. [Launch the app](#run-your-own-locally) to play locally or visit [the live site](https://pactyparrots.testnet.chainweb.com/)
5. Start playing!

## Run Your Own Locally
  - Make sure you are on latest versions of node.js, npm, and react
  - Clone project and run `npm install`
  - Once complete run `npm start`
  - Start the app from the repository's location with `localhost:3000`

## Network Configuration
The dapp assembles most of the Pact code for you from some configurable presets, allowing the dapp to be pointed to any deployment on the Pact testnet. The default, for Chain 0, is the following, and can be changed under `src/const.ts`:
```typescript
export const NetworkSettings = {
    apiEndpoint: 'api.testnet.chainweb.com',
    chainId: '0',
    nameSpace: 'user',
    module: 'pacty-parrots'
}
```

Currently, the following Pacty Parrot instances are accessible:
```typescript
// default
export const Chain0NetworkSettings = {
    apiEndpoint: 'api.testnet.chainweb.com',
    chainId: '0',
    nameSpace: 'user',
    module: 'pacty-parrots'
}
```

```typescript
// chain1
export const Chain1NetworkSettings = {
    apiEndpoint: 'api.testnet.chainweb.com',
    chainId: '1',
    nameSpace: 'free',
    module: 'pacty-parrots'
}
```

## Code specs
  - Pact code and corresponding .repl tests outlined in `/pact` directory
  - Front-end implemented with react and typescript in `/src``
  - Calls to testnet chain with [pact-lang-api](https://github.com/kadena-io/pact-lang-api)
  - Pact code is assembled from presets in `/src/const.ts`
