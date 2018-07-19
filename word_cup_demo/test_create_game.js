var Web3 = require('web3');
Web3App = new Web3(new Web3.providers.HttpProvider("http://39.106.11.241:50008"));
var contract = require("truffle-contract");
var rf = require("fs");
var data = rf.readFileSync("./contracts/WordCup.json", "utf-8");
var WordCup = contract(JSON.parse(data));
WordCup.setProvider(new Web3.providers.HttpProvider("http://39.106.11.241:50008"));

function fixTruffleContractCompatibilityIssue(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function() {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    return contract;
};

word_cup = fixTruffleContractCompatibilityIssue(WordCup);
// word_cup.defaults({
//         from: "0x207e1452E3930e40E30881bfb9cae2aaa634739d",
//         gas: 900000
//     })
word_cup.deployed().then(function(instance) {
    return instance.getContractAddress();
}).then(function(res) {
    console.log(res)
}).catch(function(err) {
    console.log(err);
});
/*
转账接口
*/
word_cup.deployed().then(function(instance) { // ERC20 转账接口
    return instance.transfer("0xa0ce316C0CA4871952077b688210c91F07dDc112", '100000000', {
        from: "0x22bCcA213d04fDF51ff14915A8877172F0B3D8de"
    });
}).then(function(res) {
    console.log(res)
}).catch(function(err) {
    console.log(err);
});
/*
创建比赛

*/
word_cup.deployed().then(function(instance) { // 创建比赛接口
    return instance.createGame('Russia', 'Saudi Arabia', {
        from: "0x22bCcA213d04fDF51ff14915A8877172F0B3D8de",
        gas: 900000
    });
}).then(function(res) {
    console.log(res)
}).catch(function(err) {
    console.log(err);
});

/*

获取账户余额
*/
word_cup.deployed().then(function(instance) { // 获取地址token接口
    return instance.balanceOf("0x22bCcA213d04fDF51ff14915A8877172F0B3D8de");
}).then(function(res) {
    console.log(Web3App.utils.toBN(res / 100000000).toString())
}).catch(function(err) {
    console.log(err);
});


word_cup.deployed().then(function(instance) { // 获取地址token接口
    return instance.balanceOf("0xa0ce316C0CA4871952077b688210c91F07dDc112");
}).then(function(res) {
    console.log(Web3App.utils.toBN(res / 100000000).toString())
}).catch(function(err) {
    console.log(err);
});

/*
获取地址下创建的比赛

*/
word_cup.deployed().then(function(instance) {
    return instance.getCreate({
        from: "0x22bCcA213d04fDF51ff14915A8877172F0B3D8de"
    }); // 获取比赛详情接口
}).then(function(res) {
    console.log(res)
}).catch(function(err) {
    console.log(err);
});

/*

解锁用户，参加比赛

*/
Web3App.eth.personal.unlockAccount("0xa0ce316C0CA4871952077b688210c91F07dDc112",
    "1234_qwer", 1500).then(function(argument) {
    // body...
    word_cup.deployed().then(function(instance) { //参加比赛接口
        return instance.partIn(0, 100000000, 1, {
            from: "0xa0ce316C0CA4871952077b688210c91F07dDc112",
            gas: 900000
        });
    }).then(function(res) {
        console.log(res)
    }).catch(function(err) {
        console.log(err);
    });
})
/*
获取比赛详情接口
*/
word_cup.deployed().then(function(instance) {
    return instance.getGame(0);
}).then(function(res) {
    console.log(res)
}).catch(function(err) {
    console.log(err);
});


/*
公布比赛结果接口
*/

word_cup.deployed().then(function(instance) { //比赛公布结果接口
    return instance.openGame(0, 2, {
        from: "0x207e1452E3930e40E30881bfb9cae2aaa634739d",
        gas: 900000
    });
}).then(function(res) {
    console.log(res)
}).catch(function(err) {
    console.log(err);
    console.log(1);
});