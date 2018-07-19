import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-Charge',
  templateUrl: './Charge.component.html',
  styleUrls: ['./Charge.component.css']
})
export class ChargeComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<ChargeComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }
  hide = true;
  ngOnInit() {
  }
  publish() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
