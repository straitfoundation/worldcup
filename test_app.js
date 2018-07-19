//  引入模块
var express = require('express');
var Web3 = require('web3');
Web3App = new Web3(new Web3.providers.HttpProvider("http://39.106.11.241:50008"));
var contract = require("truffle-contract");
var rf=require("fs");
var data=rf.readFileSync("./contracts/WordCup.json","utf-8");
var WorldCup = contract(JSON.parse(data));
WorldCup.setProvider(new Web3.providers.HttpProvider("http://39.106.11.241:50008"));

// WorldCup.defaults({
//   from: "0x7be737Eaa8B85aBC0332fF596B403AcA368D0DaF",
//   gas: 900000
// })

wc = fixTruffleContractCompatibilityIssue(WorldCup);


var web = express();

/*
     1.注册新用户





 */

web.get('/newuser',function(request,response)

{
  //var start = Date.parse(new Date());

  let personal = Web3App.eth.personal;
  personal.newAccount("123456").then(function (address) {
    console.log(address);
     // Web3App.eth.sendTransaction(
     //   {from: "0x22bCcA213d04fDF51ff14915A8877172F0B3D8de",
     //     to:address,
     //     value: Web3App.utils.toWei('1', 'ether')})
     //   .then(function (res) {
     //     //console.log(address);
     //     var end = Date.parse(new Date());
     //     console.log('注册成功， 用时：' + (end-start)/1000 + ' 秒');
     //     console.log(res);
         response.setHeader("Access-Control-Allow-Origin", "*");
         response.writeHead(200, {'Content-Type': 'application/json'});
         response.end(JSON.stringify(address));
     // }).catch(function(err) {
     //   console.log(err.message);
     // })
  })



})





/* *************************
*
*
*
*           2. 我参与的游戏列表
*           GET: /gamelist
*
*           @params
*           from: 用户地址
*
*           @return
*           gameIDs[int]: 返回所有参加的比赛的id
*
*           @error/exception
*
*
*
************************* */
web.get('/gamelist',function(request,response)

{

  //获取URL参数
  var from = request.query.from;

  //获取比赛列表

  wc.deployed().then(function(instance) {
      return instance.getPartIn ({from : from, gas: 900000});
    }).then(function (res) {

        //返回data
        var data = {
          status: '200',
          msg: '获取我参与的游戏列表成功',
          data: {
            from: from,
            gameIDs: res,
          }
        };
        console.log(data);
        for (var i=0; i<res.length; i++) {

        }



        //response设置
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(data));
    }).catch(function (err) {
    //返回data
    var data = {
      status: '200',
      msg: '获取我参与的游戏列表出错',
      data: {
        from: from,
        error: err,
      }
    };
    console.log(data);
    //response设置
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
    });


  //mock data
  // var gameIDs = [
  //   1,2,3,4,5,6,7,8
  // ];




})

/* *************************
*
*
*
*           3. 我发起的游戏列表
*           GET: /mygames
*
*           @params
*           from：用户地址
*
*           @return
*           gameID: 比赛ID
*
*           @error/exception
*
*
*
************************* */
web.get('/mygames',function(request,response)

{

  var start = Date.parse(new Date());
  var from = request.query.from;

  wc.deployed().then(function(instance) {
    return instance.getCreate({
      from: from,
    });
  }).then(function(res) {
    var end = Date.parse(new Date());
    var data = {
      status: '200',
      msg: '获取发起游戏列表成功',
      time: (end-start)/1000,
      data: {
        from: from,
        gameIDs: res,
      }
    };

    console.log(JSON.stringify(data));
    //response设置
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
  }).catch(function(err) {
    console.log(err);
  });

})

/* *************************
*
*
*
*           3-1. 获取全部游戏
*           GET: /mygames
*
*           @params
*           from：用户地址
*
*           @return
*           gameID: 比赛ID
*
*           @error/exception
*
*
*
************************* */
web.get('/allgames',function(request,response)

{

  console.log('获取全部游戏最大值');


  wc.deployed().then(function(instance) {
    return instance.getAllGame({
      
    });
  }).then(function(res) {
    
    var data = {
      status: '200',
      msg: '获取全部游戏列表成功',
      
      data: {
        maxGameID: res,
      }
    };

    console.log(JSON.stringify(data));
    //response设置
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
  }).catch(function(err) {
    console.log(err);
  });

})

/* *************************
*
*
*
*           4. 发起一个游戏
*
*           POST: /creatGame
*
*           @params
*           host: 主队
*           guest: 客队
*           from：用户地址
*
*           @return
*           gameID: 比赛ID
*
*           @error/exception
*
*
*
*
*
************************* */
web.post('/createGame',function(request,response)

{
  //获取URL参数
  var from = request.query.from;
  var host = request.query.host;
  var guest = request.query.guest;
  var start = Date.parse(new Date());

  //创建比赛
  Web3App.eth.personal.unlockAccount(from,
    "123456", 1500).then(function(argument) {
          wc.deployed().then(function(instance) {// 创建比赛接口
            return instance.createGame(host, guest, {from : from, gas: 900000});
          }).then(function (res) {

            var end = Date.parse(new Date());
            //返回data
            var data = {
              status: '200',
              msg: '发起成功',
              time: (end-start)/1000,
              data: {
                from: from,
                host: host,
                guest: guest,
                gameID: res.logs[0].args._tokenId,
              }
            };

            //输出到控制台
            console.log(JSON.stringify(res));
            //response设置
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(data));

          }).catch(function (err) {
            console.log(err);
            //返回data
            var data = {
              status: '200',
              msg: '发起出错',
              data: {
                from: from,
                host: host,
                guest: guest,
                error: err,
              }
            };

            //response设置
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(data));
          });

  })



})

/* *************************
*
*
*
*           5. 下注一个游戏
*           POST: /bet
*
*           @params
*           from: 用户地址
*           gameID: 比赛id
*	          value: 下注金额
*	          betting: 投注结果：0：主胜 1：主平 2：主负 3：未赛
*
*           @return
*
*           @error/exception
*
************************* */
web.post('/bet',function(request,response)

{

  var from = request.query.from;
  var gameID = request.query.gameID;
  var value = request.query.value;
  var betting = request.query.betting;

  //下注
  wc.deployed().then(function(instance) {//参加比赛接口
      return instance.partIn(gameID, value, betting, {from : from, gas: 900000});
    }).then(function (res) {
        console.log(res);
    var data = {
      status: '200',
      msg: '下注成功',
      data: {
        result: res,
      }
    };
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
    }).catch(function (err) {
        console.log(err);
    });




})

/* *************************
*
*
*
*           6. 设置比赛结果
*           POST: /setgame
*
*           @params
*           from: 用户地址
*           gameID: 比赛id
*	          result: 设置结果：0：主胜 1：主平 2：主负 3：未设置
*
*           @return
*
*           @error/exception
*
*
*
************************* */
web.post('/setgame',function(request,response)

{
  var from = request.query.from;
  var gameID = request.query.gameID;
  var result = request.query.result;

  // 设置比赛结果
  wc.deployed().then(function(instance) {//比赛公布结果接口
      return instance.openGame(gameID, result, {from : from, gas: 900000});
    }).then(function (res) {
        console.log(res);
    var data = {
      status: '200',
      msg: '设置成功',
      data: {
        from: from,
        result: res,
      }
    };
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
    }).catch(function (err) {
        console.log(err);
    var data = {
      status: '200',
      msg: '设置错误',
      data: {
        from: from,
        error: err,
      }
    };
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
    });


  var data = {
    status: '200',
    msg: '设置成功',
    data: {
      from: from,
      gameID: gameID,
      result: result,
    }
  };

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(data));

})


/* *************************
*
*
*
*           7. 获取比赛详情
*           GET: /getgame
*
*           @params
*           gameID: 比赛id
*
*           @return
*           第0个值 创建比赛人的地址
            第1个值 比赛状态（0 进行中 1 已结束 2 已返还  只有0状态下才可以对比赛下注和设置比赛接口）
             第2个值 红方下注人数
            第3个值 蓝方下注人数
            第4个值 总下注人数
            第5个值 红方
            第6个值 蓝方
            第7个值 获胜方
            第8个值 总奖池金额

          示例：
            [ '0x207e1452e3930e40e30881bfb9cae2aaa634739d',
             BigNumber { s: 1, e: 0, c: [ 1 ] },
              BigNumber { s: 1, e: 0, c: [ 1 ] },
              BigNumber { s: 1, e: 0, c: [ 1 ] },
              BigNumber { s: 1, e: 0, c: [ 2 ] },
            '0x5275737369610000000000000000000000000000000000000000000000000000',
            '0x5361756469204172616269610000000000000000000000000000000000000000',
            '0x5275737369610000000000000000000000000000000000000000000000000000',
            BigNumber { s: 1, e: 8, c: [ 200000000 ] } ]
*
*           @error/exception
*
*
*
************************* */
web.get('/getgame',function(request,response)

{
  var gameID = request.query.gameID;

  // 获取比赛详情
    wc.deployed().then(function(instance) {
      return instance.getGame(gameID);// 获取比赛详情接口
    }).then(function (res) {
        console.log(res);
      var host;
      var guest;
      //console.log(Web3App.utils.hexToAscii(hex));
      host = Web3app.utils.hexToAscii(res[6]);

      guest = Web3app.utils.hexToAscii(res[7]);
      var data = {
        status: '200',
        msg: '获取比赛详情成功',
        data: {
          result: res,
          host: host,
          guest: guest,
          //result: game,
        }
      };
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(data));
    }).catch(function (err) {
      console.log(err);
      var data = {
        status: '200',
        msg: '获取比赛详情错误',
        data: {
          error: err,
          //result: game,
        }
      };

      response.setHeader("Access-Control-Allow-Origin", "*");
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(data));
    });
})

/* *************************
*
*
*
*           8. 获取用户余额
*           POST: /getBalance
*
*           @params
*           from: 用户地址
*
*           @return
*           balance: 代币余额
*
*           @error/exception
*
*
*
************************* */
web.get('/getBalance',function(request,response)

{
  var from = request.query.from;
  var data;

  /* 获取余额
  */
  wc.deployed().then(function(instance) { // 获取地址token接口
      return instance.balanceOf(from);
  }).then(function(res) {
    data = {
      status: '200',
      msg: '获取ERC20余额成功',
      data: {
        from: from,
        balance: res / 100000000,
      }
    };
    //console.log(Web3App.utils.toBN(res).toString());
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
  }).catch(function(err) {
    console.log(err);
    data = {
      status: '200',
      msg: err,
      data: {
        from: from,
        balance: balance,
      }
    };
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
  });


  //mock data
  //var balance = res;

  // var data = {
  //   status: '200',
  //   msg: '获取余额成功',
  //   data: {
  //     from: from,
  //     balance: balance,
  //   }
  // };

  // response.setHeader("Access-Control-Allow-Origin", "*");
  // response.writeHead(200, {'Content-Type': 'application/json'});
  // response.end(JSON.stringify(data));

})

/* *************************
*
*
*
*           9. 转账
*           POST: /transfer
*
*           @params
*           from: 用户地址
*           to: 用户地址
*           value: 转账数额
*
*           @return
*
*
*           @error/exception
*
*
*
************************* */
web.post('/transfer',function(request,response)

{
  var from = request.query.from;
  var to = request.query.to;
  var value = request.query.value;




  // 转账
  var begin = Date.parse(new Date());
  console.log('开始转账>>>')
  wc.deployed().then(function(instance) { // ERC20 转账接口
      return instance.transfer(to, value, {from : from});
    }).then(function (res) {
        //var data = res;
    var end = Date.parse(new Date());
        console.log('转账成功');
        console.log('用时： ' + (end-begin)/1000 + ' 秒');
        console.log(res);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(res));
    }).catch(function (err) {
      console.log('转账错误');
      console.log(err);
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(err));
    });

})

/*
    转eth
 */
web.post('/transferEth',function(request,response){
  var to = request.query.to;
  var begin = Date.parse(new Date());

  Web3App.eth.sendTransaction(
    {from: "0x22bCcA213d04fDF51ff14915A8877172F0B3D8de",
      to: to,
      value: Web3App.utils.toWei('1', 'ether')})
    .then(function (res) {
      //console.log(address);
      var end = Date.parse(new Date());
      console.log('Eth转账成功， 用时：' + (end-begin)/1000 + ' 秒');
      console.log(res);
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(res));
    }).catch(function(err) {
    console.log(err.message);
  })


})

/*

          启动服务器

 */
web.listen('9000',function()

{

  console.log('listening on port: 9000');

})

/*

         其他方法

 */
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
