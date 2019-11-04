# Welcome to Pacty Parrots!!

## How to play:
follow all instructions [testnet portal](testnet.chainweb.com)
it will involve:
  - downloading Chainweaver desktop wallet (macOS)
  - funding an account with our testnet [coin faucet](faucet.testnet.chainweb.com)
  - make sure wallet is pointing to a testnet node (ex:`us1.testnet.chainweb.com`)

## Code specs:
  - pact code and corresponding .repl tests outlined in /pact directory
  - front-end implemented with react in /src
  - calls to testnet chain with [pact-lang-api](https://github.com/kadena-io/pact-lang-api)
  - all pact calls in src/contexts/PactContext.js

## Run Your Own Locally:
  - make sure you are on latest versions of node.js, npm, and react
  - clone project and run
  `npm install`
  - once complete run `npm start`
  - will be visible on `localhost:8083`
