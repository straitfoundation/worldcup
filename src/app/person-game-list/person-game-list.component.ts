import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-person-game-list',
  templateUrl: './person-game-list.component.html',
  styleUrls: ['./person-game-list.component.css'],
  inputs: ['inputsValue']
})
export class PersonGameListComponent implements OnInit {
  displayedColumns = ['name', 'result', 'bet', 'time', 'bonus', 'mybonus', 'status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  private inputsValue;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
export interface Element {
  time: string;
  result: number;
  bonus: number;
  status: number;
  bet: number;
  mybonus: number;
  name: string;
}

const ELEMENT_DATA: Element[] = [
  {result: 132, time: '2018-6-15 23:13', bonus: 10079, status: 0, bet: 132, mybonus: 3000, name: '游戏#1532'},
  {result: 244, time: '2018-6-15 23:13', bonus: 40026, status: 1, bet: 132, mybonus: 0, name: '游戏#321'},
  {result: 387, time: '2018-6-15 23:13', bonus: 6941, status: 1, bet: 132, mybonus: 0, name: '游戏#1890'},
  {result: 978, time: '2018-6-15 23:13', bonus: 90122, status: 2, bet: 978, mybonus: 0, name: '游戏#2577'},
  {result: 554, time: '2018-6-15 23:13', bonus: 10811, status: 1, bet: 132, mybonus: 0, name: '游戏#999'},
  {result: 386, time: '2018-6-15 23:13', bonus: 120107, status: 2, bet: 132, mybonus: 0, name: '游戏#1532'},
  {result: 799, time: '2018-6-15 23:13', bonus: 140067, status: 0, bet: 132, mybonus: 200, name: '游戏#623'},
  {result: 988, time: '2018-6-15 23:13', bonus: 159994, status: 1, bet: 132, mybonus: 0, name: '游戏#755'},
  {result: 459, time: '2018-6-15 23:13', bonus: 189984, status: 0, bet: 132, mybonus: 56800, name: '游戏#1532'},
  {result: 120, time: '2018-6-15 23:13', bonus: 201797, status: 1, bet: 132, mybonus: 0, name: '游戏#986332'},
  {result: 611, time: '2018-6-15 23:13', bonus: 229897, status: 0, bet: 132, mybonus: 9000, name: '游戏#198756385'},
];
