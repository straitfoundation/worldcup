import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import { PersonComponent} from '../person/person.component';
import {PersonProfileComponent} from '../person-profile/person-profile.component';

@Component({
  selector: 'app-person-joined',
  templateUrl: './person-joined.component.html',
  styleUrls: ['./person-joined.component.css']
})
export class PersonJoinedComponent implements OnInit {
  dialogResult;
  data;
  enabled: boolean;
  enable1: boolean;
  enable2: boolean;
  enable3: boolean;
  firstClick: boolean;
  constructor(public dialog: MatDialog,
              public thisDialogRef: MatDialogRef<PersonJoinedComponent>) { }

  ngOnInit() {
    this.enabled = false;
    this.enable1 = false;
    this.enable2 = false;
    this.enable3 = false;
    this.firstClick = true;
  }
  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
  }
  openPerson() {
    const dialogRef = this.dialog.open(PersonComponent, {
      width: '300px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
  }
  close() {
    this.thisDialogRef.close();
  }
  toggle(index: number){
    if (this.firstClick) {
      this.enable1 = true;
      this.enable2 = true;
      this.enable3 = true;
      this.firstClick = false;
    }
    if (index === 1) {
      this.enable1 = !this.enable1;
    }
    if (index === 2) {
      this.enable2 = !this.enable2;
    }
    if (index === 3) {
      this.enable3 = !this.enable3;
    }
  }

}
