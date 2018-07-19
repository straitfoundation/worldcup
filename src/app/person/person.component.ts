import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {MAT_DIALOG_DATA} from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  private timer;
  count: number;
  loaded: boolean;
  show_spinner: boolean;
  userAddr: string;
  chainUrl: string;
  title: string;

  constructor(private usrSvc: UserService,
              @Inject(MAT_DIALOG_DATA) public option: number) { }

  ngOnInit() {
    this.loaded = false;
    this.show_spinner = false;
    this.count = 0;
    this.userAddr = this.usrSvc.getUserAddress();
    this.chainUrl = this.usrSvc.getChainUrl();

    console.log('初始化个人中心');
    console.log('user address: ' + this.userAddr);


  }
  ngAfterViewInit() {
    // this.timer = setInterval(() => {
    //   this.count += 1;
    //   if (this.count === 1) {
    //     //this.count = 0;
    //     this.show_spinner = true;
    //   }
    //   if (this.count === 8) {
    //     //this.count = 0;
    //     this.show_spinner = false;
    //     this.loaded = true;
    //     clearInterval(this.timer);
    //     console.log('个人中心初始化完成');
    //     // console.log(this.usrSvc.getJoinedList());
    //   }
    // }, 500);


  }


}
