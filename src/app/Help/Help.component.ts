import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-Help',
  templateUrl: './Help.component.html',
  styleUrls: ['./Help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<HelpComponent>, @Inject(MAT_DIALOG_DATA) public data: number) { }
  hide = true;
  football: boolean;
  other: boolean;
  ngOnInit() {
    if( this.data === 0) {
      this.football = true;
      this.other = true;
    }
    if (this.data === 1) {
      this.football = true;
      this.other = false;
    }
    if (this.data === 2) {
      this.other = true;
      this.football = false;
    }
  }
  publish() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
