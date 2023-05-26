const MyContract = artifacts.require("Graph");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(MyContract);
};