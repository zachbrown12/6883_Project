var HDWalletProvider = require("truffle-hdwallet-provider")
const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
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
  },
    compilers: {
      solc: {
        version: "0.5.16"  // ex:  "0.4.20". (Default: Truffle's installed solc)
      }
    }

  },
  compilers: {
    solc: {
      version: "0.5.17"  // ex:  "0.4.20". (Default: Truffle's installed solc)
    }
 }

};
