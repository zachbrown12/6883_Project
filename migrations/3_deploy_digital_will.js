var Transaction = artifacts.require("./SendEther.sol");

module.exports = function(deployer) {
  deployer.deploy(Transaction);
};
