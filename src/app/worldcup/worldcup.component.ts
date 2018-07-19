import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {Worldcup_confirmComponent} from "../worldcup_confirm/worldcup_confirm.component";
import {GameService} from '../game.service';
import {UserService} from '../user.service';
declare var $: any;

@Component({
  selector: 'app-worldcup',
  templateUrl: './worldcup.component.html',
  styleUrls: ['./worldcup.component.css']
})
export class WorldcupComponent implements OnInit {
  displayedColumns = ['position', 'gameID', 'name', 'weight', 'pool'];
  games: any;
  matches: any;
  selected: any;
  username: any;


  constructor(public thisDialogRef: MatDialogRef<Worldcup_confirmComponent>,
              private gameSvc: GameService,
              private userSvc: UserService,
              @Inject(MAT_DIALOG_DATA) public data: string,
              public dialog: MatDialog) { }
  hide = true;
  ngOnInit() {
    this.matches = this.gameSvc.getGameList();
    this.games = this.userSvc.getAllGameList();
    this.getUsername();
  }
  getUsername() {
    // http://47.95.116.38:9998/user?userAddr=0x9e3b54263a4Aac9cac25E282191775fb28ab0aB8
    for ( var i = 0; i < this.games.length; i++) {
      let userAddr = this.games[i][0];
      console.log(userAddr);
      $.ajax({
        url: this.userSvc.getApiUrl() + '/user?userAddr=' + userAddr,
        usrSvc: this.userSvc,
        game: this.games[i],
        instance: this,
        dataType: 'json',
        method: 'GET',
        success: function(data) {
          if (data.status === '200') {
            console.log('获取用户名：' + data.username);
            this.game.push(data.username);

          } else {
            console.log(data);
            return 0;
          }
        },
        error: function(xhr) {
          alert('error:' + JSON.stringify(xhr)); }
      });
    }
  }
  bet(gameID: any) {
    console.log(gameID);
    let game: any;
    for ( var i = 0; i < this.games.length; i++) {
      if (this.games[i][10] === gameID ) {
        game = this.games[i];
      }
    }
    const clientWidth = document.body.clientWidth;
    var width;
    if (clientWidth > 1024) {
      width = '450px';
    } else {
      width = '400px';
    }
    const dialogRef = this.dialog.open(Worldcup_confirmComponent, {
      width: width,
      data: game,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result === 'bet') {
        this.thisDialogRef.close();
      }

      // this.dialogResult = result;
    });
  }
}

