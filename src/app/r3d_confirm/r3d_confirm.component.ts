import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-r3d_confirm',
  templateUrl: './r3d_confirm.component.html',
  styleUrls: ['./r3d_confirm.component.css']
})
export class R3d_confirmComponent implements OnInit {

  numbers = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '3'},
    {value: '5', viewValue: '3'},
    {value: '6', viewValue: '3'},
    {value: '7', viewValue: '3'},
    {value: '8', viewValue: '3'},
    {value: '9', viewValue: '3'},

  ];
  selected1: any;
  selected2: any;
  selected3: any;
  constructor(public thisDialogRef: MatDialogRef<R3d_confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
  }
  hide = true;
  checked: boolean;
  ngOnInit() {

  }
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  Cancel() {
    this.thisDialogRef.close('Cancel');
  }
}
