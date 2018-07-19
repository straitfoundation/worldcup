import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import { WorldcupComponent} from "../worldcup/worldcup.component";
import { R3dComponent} from "../r3d/r3d.component";
import { R113Component} from "../r113/r113.component";
import {GameDrawComponent} from '../game-draw/game-draw.component';
import {PublishComponent} from '../Publish/Publish.component';
import {HelpComponent} from '../Help/Help.component';
import {UserService} from '../user.service';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-publishlist',
  templateUrl: './PublishList.component.html',
  styleUrls: ['./PublishList.component.css']
})
export class PublishListComponent implements OnInit {
  more: boolean;
  bet_txt: string;

  constructor(public dialog: MatDialog,
              private userSvc: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.more = true;
    this.bet_txt = '开盘';
  }
  openDialog_worldcup() {
    const dialogRef = this.dialog.open(WorldcupComponent, {
      width: '70%',
      height: '80%',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
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
  publish(game: string) {
    const clientWidth = document.body.clientWidth;
    var width;
    if (clientWidth > 1024) {
      width = '600px';
    } else {
      width = '70%';
    }
    const dialogRef = this.dialog.open(PublishComponent, {
      width: width,
      // height: '80%',
      data: game,
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
  openWhenLogin (game: string) {
    const isLogin = this.userSvc.getLoginStatus();
    if (isLogin) {
      this.publish(game);
    } else {
      this.snackBar.open('您还未登陆', '请先登陆', {
        duration: 2000,
        //horizontalPosition: 'left',
        verticalPosition: 'top',
      });
      this.openLogin();
    }
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
