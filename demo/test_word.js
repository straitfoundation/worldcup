// "use strict";
var Web3 = require('web3');
var contract = require("truffle-contract");
var rf=require("fs");  
var data=rf.readFileSync("./contracts/WordCup.json","utf-8");
var WordCup = contract(JSON.parse(data)); 
WordCup.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));
Web3App = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
WordCup.defaults({
        from: "0x7be737Eaa8B85aBC0332fF596B403AcA368D0DaF",
        gas: 900000
    })
zero_token = fixTruffleContractCompatibilityIssue(WordCup);
// Web3App.eth.sendTransaction(
//                     {from: "0x7be737Eaa8B85aBC0332fF596B403AcA368D0DaF", 
//                     to:"0xa967c9ef7801933525d25ff77e9c498b48822c05", 
//                     value: Web3App.utils.toWei('1', 'ether')}).then(function (res) {
//                         console.log(res);
//                     }).catch(function(err) {
//                     console.log(err.message);
//                     });
var res = zero_token.deployed().then(function(instance) {
      return instance.getContractAddress();
    }).then(function (res) {
        console.log(res)
        return res;
    }).catch(function (err) {
        // body...
        console.log(err);
    });
zero_token.deployed().then(function(instance) {
      return instance.getContractBalance();
    }).then(function (res) {
        console.log(res)
        return res;
    }).catch(function (err) {
        // body...
        console.log(err);
    });

zero_token.deployed().then(function(instance) {
      return instance.getAddressBalance();
    }).then(function (res) {
        console.log(res)
        return res;
    }).catch(function (err) {
        // body...
        console.log(err);
    });
// Show Web3 where it needs to look for a connection to Ethereum.

function fixTruffleContractCompatibilityIssue(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function() {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    return contract;
}
