import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import {GameService} from '../game.service';
import {UserService} from '../user.service';
import {Worldcup_confirmComponent} from '../worldcup_confirm/worldcup_confirm.component';
import {Worldcup_setresultComponent} from '../worldcup_setresult/worldcup_setresult.component';

@Component({
  selector: 'app-person-published-wc',
  templateUrl: './person-published-wc.component.html',
  styleUrls: ['./person-published-wc.component.css'],
  inputs: ['inputsValue']
})
export class PersonPublishedWcComponent implements OnInit {
  displayedColumns = ['match', 'result', 'time', 'bonus', 'mybonus'];
  games: any;
  result: string;
  chainUrl: string;
  from: string;
  btn_disabled: boolean;
  btn_txt: string;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  private inputsValue;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private gameSvc: GameService,
              private userSvc: UserService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.games = this.userSvc.getPublishedList();
    this.btn_disabled = false;
    // this.btn_txt = '开奖';
    console.log('我发起的游戏列表： ' + this.games);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  setGame(gameID: any){
    // http://47.104.136.172/setgame?from=0x3f6e8587a0cd1598fbcd5264cEAB70727D21CB21&gameID=0&result=0
    console.log('设置比赛结果: ' + gameID);
    let game: any;
    for ( var i = 0; i < this.games.length; i++) {
      if (this.games[i][10] === gameID ) {
        game = this.games[i];
      }
    }
    const dialogRef = this.dialog.open(Worldcup_setresultComponent, {
      width: '350px',
      data: game,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result === 'succeed') {
        //this.thisDialogRef.close();
        game[1] = '1';
      }

      // this.dialogResult = result;
    });

  }
}
export interface Element {
  match: string;
  time: string;
  result: number;
  bonus: number;
  mybonus: number;
}

const ELEMENT_DATA: Element[] = [
  {match: '中国 vs. 巴西', result: 0, time: '2018-6-15 23:13', bonus: 10079, mybonus: 100},
  {match: '德国 vs. 法国', result: 3, time: '2018-6-15 23:13', bonus: 40026, mybonus: 100},
  {match: '中国 vs. 巴西', result: 2, time: '2018-6-15 23:13', bonus: 6941, mybonus: 100},
  {match: '中国 vs. 巴西', result: 2, time: '2018-6-15 23:13', bonus: 90122, mybonus: 100},
  {match: '中国 vs. 巴西', result: 3, time: '2018-6-15 23:13', bonus: 10811, mybonus: 100},
  {match: '中国 vs. 巴西', result: 2, time: '2018-6-15 23:13', bonus: 120107, mybonus: 100},
  {match: '中国 vs. 巴西', result: 3, time: '2018-6-15 23:13', bonus: 140067, mybonus: 100},
  {match: '中国 vs. 巴西', result: 0, time: '2018-6-15 23:13', bonus: 159994, mybonus: 100},
  {match: '中国 vs. 巴西', result: 3, time: '2018-6-15 23:13', bonus: 189984, mybonus: 100},
  {match: '中国 vs. 巴西', result: 0, time: '2018-6-15 23:13', bonus: 201797, mybonus: 100},
  {match: '中国 vs. 巴西', result: 0, time: '2018-6-15 23:13', bonus: 229897, mybonus: 100},
];
