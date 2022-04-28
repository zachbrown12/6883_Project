const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey= require('./secrets.json').privateKey;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  //contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8765,            // Standard Huygen port (default: none)
      network_id: "*",   
      //port: 8545 used this when using rinkeyby
    },
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(
        "churn liquid utility repeat advance rabbit cup width dress faith fatal retreat" 
        ,"https://rinkeby.infura.io/v3/7bc36352f62642aaa6e0d6bbf3d99eef");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
    huygens: { 
      networkCheckTimeout: 10000,
      provider: () => new HDWalletProvider([privateKey], `https://huygens.computecoin.network/`),
      network_id: 828,
      confirmations: 10,
      timeoutBlocks: 20,
      skipDryRun: true
  },
    huygens_dev: {
      provider: () => new HDWalletProvider(
        {
          privateKeys: ["8dd7404640b7f48e90967ad86e6402cfc39163cd391e32e07042f6f5c0a9639d"], 
          providerOrUrl: `https://test-huygens.computecoin.info`,
          chainID: 3, 
        }
          ),
      network_id: 828,
      confirmations: 10,
      timeoutBlocks: 20,
      skipDryRun: true
  },
  },

  mocha: {
    // timeout: 100000
  },

    compilers: {
      solc: {
        version: "^0.8.0",  // ex:  "0.4.20". (Default: Truffle's installed solc)
      }
    }

};
