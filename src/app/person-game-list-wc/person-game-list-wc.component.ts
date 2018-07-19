import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort} from '@angular/material';
import {UserService} from '../user.service';

@Component({
  selector: 'app-person-game-list-wc',
  templateUrl: './person-game-list-wc.component.html',
  styleUrls: ['./person-game-list-wc.component.css'],
  inputs: ['inputsValue']
})
export class PersonGameListWcComponent implements OnInit {
  displayedColumns = ['match', 'result', 'bet', 'time', 'bonus', 'status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  games: any;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  private inputsValue;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private usrSvc: UserService) { }

  ngOnInit() {
    this.games = this.usrSvc.getJoinedList();

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // console.log('我参与的游戏列表' + this.gameList[0][1]);
  }
}
export interface Element {
  match: string;
  time: string;
  result: number;
  bonus: number;
  status: number;
  bet: number;
}

const ELEMENT_DATA: Element[] = [
  {match: '中国 vs. 巴西', result: 0, time: '2018-6-15 23:13', bonus: 10079, status: 0, bet: 0},
  {match: '德国 vs. 法国', result: 1, time: '2018-6-15 23:13', bonus: 40026, status: 1, bet: 0},
  {match: '中国 vs. 巴西', result: 2, time: '2018-6-15 23:13', bonus: 6941, status: 1, bet: 0},
  {match: '中国 vs. 巴西', result: 2, time: '2018-6-15 23:13', bonus: 90122, status: 1, bet: 0},
  {match: '中国 vs. 巴西', result: 1, time: '2018-6-15 23:13', bonus: 10811, status: 2, bet: 0},
  {match: '中国 vs. 巴西', result: 2, time: '2018-6-15 23:13', bonus: 120107, status: 2, bet: 0},
  {match: '中国 vs. 巴西', result: 0, time: '2018-6-15 23:13', bonus: 140067, status: 2, bet: 0},
  {match: '中国 vs. 巴西', result: 0, time: '2018-6-15 23:13', bonus: 159994, status: 0, bet: 0},
  {match: '中国 vs. 巴西', result: 0, time: '2018-6-15 23:13', bonus: 189984, status: 2, bet: 0},
  {match: '中国 vs. 巴西', result: 0, time: '2018-6-15 23:13', bonus: 201797, status: 0, bet: 0},
  {match: '中国 vs. 巴西', result: 0, time: '2018-6-15 23:13', bonus: 229897, status: 0, bet: 0},
];
