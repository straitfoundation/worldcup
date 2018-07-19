import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-person-game-list-draw',
  templateUrl: './person-game-list-draw.component.html',
  styleUrls: ['./person-game-list-draw.component.css'],
  inputs: ['inputsValue']
})
export class PersonGameListDrawComponent implements OnInit {
  displayedColumns = ['name', 'bet', 'time', 'bonus', 'mybonus', 'status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  private inputsValue;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
export interface Element {

  time: string;
  bonus: number;
  status: number;
  bet: number;
  mybonus: number;
  name: string;
}

const ELEMENT_DATA: Element[] = [
  {time: '2018-6-15 23:13', bonus: 10079, status: 0, bet: 10, mybonus: 10079, name: '游戏#1532'},
  {time: '2018-6-15 23:13', bonus: 40026,  status: 1, bet: 20, mybonus: 0, name: '游戏#32'},
  {time: '2018-6-15 23:13', bonus: 6941,  status: 2, bet: 30, mybonus: 0, name: '游戏#532'},
  {time: '2018-6-15 23:13', bonus: 90122, status: 0, bet: 40, mybonus: 90122, name: '游戏#132'},
  {time: '2018-6-15 23:13', bonus: 10811, status: 0, bet: 50, mybonus: 10811, name: '游戏#25467'},
  {time: '2018-6-15 23:13', bonus: 120107, status: 1, bet: 60, mybonus: 0, name: '游戏#1532'},
  {time: '2018-6-15 23:13', bonus: 140067, status: 1, bet: 70, mybonus: 0, name: '游戏#1532'},
  {time: '2018-6-15 23:13', bonus: 159994, status: 2, bet: 80, mybonus: 0, name: '游戏#1532'},
  {time: '2018-6-15 23:13', bonus: 189984, status: 2, bet: 90, mybonus: 0, name: '游戏#1532'},
  {time: '2018-6-15 23:13', bonus: 201797, status: 0, bet: 20, mybonus: 201797, name: '游戏#1532'},
  {time: '2018-6-15 23:13', bonus: 229897, status: 0, bet: 30, mybonus: 229897, name: '游戏#1532'},
];
