import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import { PersonComponent} from '../person/person.component';
import {PersonJoinedComponent} from '../person-joined/person-joined.component';

@Component({
  selector: 'app-person-published',
  templateUrl: './person-published.component.html',
  styleUrls: ['./person-published.component.css']
})
export class PersonPublishedComponent implements OnInit {
  dialogResult;
  data;
  enabled = false;
  constructor(public dialog: MatDialog,
              public thisDialogRef: MatDialogRef<PersonPublishedComponent>) { }

  ngOnInit() {
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
}
