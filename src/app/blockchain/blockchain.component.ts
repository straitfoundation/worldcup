import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
declare var $: any;

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {
  input1: any;
  constructor(private usrSvc: UserService) {
  }

  ngOnInit() {
    this.test();
    //this.input1 = this.usrSvc.getLoginStatus();
  }
  test(): void {
    this.usrSvc.getTestValue().subscribe(input1 => this.input1 = input1);
  }



}
