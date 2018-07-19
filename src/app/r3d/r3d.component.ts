import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { R3d_confirmComponent} from "../r3d_confirm/r3d_confirm.component";


@Component({
  selector: 'app-r3d',
  templateUrl: './r3d.component.html',
  styleUrls: ['./r3d.component.css']
})
export class R3dComponent implements OnInit {
  displayedColumns = ['position', 'time', 'weight', 'name', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  @ViewChild(MatSort) sort: MatSort;

  constructor(public thisDialogRef: MatDialogRef<R3d_confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: string, public dialog: MatDialog) { }
  hide = true;
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  openDialog() {
    const dialogRef = this.dialog.open(R3d_confirmComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
    });
  }
}
export interface Element {
  time: string;
  position: number;
  weight: number;
  symbol: string;
  name: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, time: '2018-6-15 23:13', weight: 10079, symbol: 'H', name: '11选3#5677'},
  {position: 2, time: '2018-6-15 23:13', weight: 40026, symbol: 'He', name: '11选3#444'},
  {position: 3, time: '2018-6-15 23:13', weight: 6941, symbol: 'Li', name: '11选3超级盘'},
  {position: 4, time: '2018-6-15 23:13', weight: 90122, symbol: 'Be', name: '11选3大热盘'},
  {position: 5, time: '2018-6-15 23:13', weight: 10811, symbol: 'B', name: '11选3#5677'},
  {position: 6, time: '2018-6-15 23:13', weight: 120107, symbol: 'C', name: '11选3#5677'},
  {position: 7, time: '2018-6-15 23:13', weight: 140067, symbol: 'N', name: '11选3#5677'},
  {position: 8, time: '2018-6-15 23:13', weight: 159994, symbol: 'O', name: '11选3#5677'},
  {position: 9, time: '2018-6-15 23:13', weight: 189984, symbol: 'F', name: '11选3#5677'},
  {position: 10, time: '2018-6-15 23:13', weight: 201797, symbol: 'Ne', name: '11选3#5677'},
  {position: 11, time: '2018-6-15 23:13', weight: 229897, symbol: 'Na', name: '11选3#5677'},
];
