import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import { WorldcupComponent} from "../worldcup/worldcup.component";
import { R3dComponent} from "../r3d/r3d.component";
import { R113Component} from "../r113/r113.component";
import {GameDrawComponent} from '../game-draw/game-draw.component';
import {UserService} from '../user.service';
import {PersonComponent} from '../person/person.component';
import {LoadingComponent} from '../loading/loading.component';
import {HelpComponent} from '../Help/Help.component';
import {LoginComponent} from '../login/login.component';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  more: boolean;
  vip: boolean;
  bet_txt: string;
  chainUrl: string;
  requestCount: number;
  loadingDialog: any;
  private timer;

  constructor(public dialog: MatDialog,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.more = true;
    this.bet_txt = '投注';
    this.chainUrl = this.userService.getChainUrl();
  }
  openLoading () {
    this.loadingDialog = this.dialog.open(LoadingComponent, {
      width: '250px',
      data: '加载区块链...',
      disableClose: true,
    });
    this.loadingDialog.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
    });
  }
  closeLoading() {
    this.loadingDialog.close();
  }
  openWhenLogin () {
    const isLogin = this.userService.getLoginStatus();
    if (isLogin) {
      this.open_worldcup();
    } else {
      this.snackBar.open('您还未登陆', '请先登陆', {
        duration: 2000,
        //horizontalPosition: 'left',
        verticalPosition: 'top',
      });
      this.openLogin();
    }
  }
  open_worldcup() {
    this.userService.clearAllGameList();
    this.requestCount = 0;
    this.openLoading();
    //get all games
    $.ajax({
      url: this.chainUrl + '/allgames',
      instance: this,
      dataType: 'json',
      method: 'GET',
      success: function (data) {
        //this.instance.requestCount--;
        if (data.status === '200') {
          console.log('最大游戏id：' + data.data.maxGameID);
          this.instance.open_worldcup_dialog();
          const game_count = data.data.maxGameID ;
          for (let i = 0; i < game_count; i++) {
            this.instance.requestCount++;

              this.instance.getGameDetail(i);



          }
          // this.usrSvc.setUserBalance(data.data.balance);
        } else {
          console.log(data);
          return 0;
        }
      },
      error: function (xhr) {
        alert('error:' + JSON.stringify(xhr));
      }
    });

  }
  open_worldcup_dialog() {
    this.timer = setInterval(() => {
      if (this.requestCount === 0) {
        //this.count = 0;
        clearInterval(this.timer);
        console.log('获取全部游戏信息完成');
        this.closeLoading();
        const clientWidth = document.body.clientWidth;
        var width;
        if (clientWidth > 1024) {
          width = '850px';
        } else {
          width = '90%';
        }
        const dialogRef = this.dialog.open(WorldcupComponent, {
          width: width,
          height: '80%',
          data: 'This text is passed into the dialog!'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog closed: ${result}`);
          // this.dialogResult = result;
        });
        // console.log(this.usrSvc.getJoinedList());
      }
    }, 500);
  }
  getGameDetail (gameID: any) {
    $.ajax({
      url: this.chainUrl + '/getgame?gameID=' + gameID,
      usrSvc: this.userService,
      instance: this,
      dataType: 'json',
      method: 'GET',
      success: function(data) {
        this.instance.requestCount--;
        if (data.status === '200') {
            console.log('获取全部游戏详情之：' + gameID);
            data.data.result.push(gameID);
            console.log(data.data.result);
            this.instance.getUsername(data.data.result);


        } else {
          console.log(data);
          return 0;
        }
      },
      error: function(xhr) {
        alert('error:' + JSON.stringify(xhr)); }
    });
  }
  getUsername(game: any) {

    // http://47.95.116.38:9998/user?userAddr=0x9e3b54263a4Aac9cac25E282191775fb28ab0aB8

      let userAddr = game[0];
      //console.log(userAddr);
      $.ajax({
        url: this.userService.getApiUrl() + '/user?userAddr=' + userAddr,
        usrSvc: this.userService,
        instance: this,
        dataType: 'json',
        method: 'GET',
        success: function(data) {
          if (data.username) {
            console.log('获取用户名：' + data.username);
            game.push(data.username);
            console.log(game);
            this.usrSvc.addToAllGameList(game);
          } else {
            console.log(data);
            return 0;
          }
        },
        error: function(xhr) {
          alert('error:' + JSON.stringify(xhr)); }
      });

  }
  openDialog_3d() {
    const dialogRef = this.dialog.open(R3dComponent, {
      width: '70%',
      height: '80%',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
    });
  }
  openDialog_113() {
    const dialogRef = this.dialog.open(R113Component, {
      width: '70%',
      height: '80%',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
    });
  }
  openDialog_draw() {
    const dialogRef = this.dialog.open(GameDrawComponent, {
      width: '70%',
      height: '80%',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
    });
  }
  openHelp(option: number) {
    const dialogRef = this.dialog.open(HelpComponent, {
      width: '80%',
      height: '40%',
      data: option,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
     // this.dialogResult = result;
    });
  }
  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
      //this.isLogin = this.userService.getLoginStatus();
      //this.username = this.userService.getUsername();
    });
  }
}
