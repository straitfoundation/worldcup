import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  private timer2;
  progress: string[];
  count: number;
  spinner_label: string;
  size: number;

  constructor() { }

  ngOnInit() {

    this.count = 0;
    this.progress = [
      '加载区块链', '检查授权' , '授权通过' , '读取个人信息', '读取发布信息', '读取参与游戏信息'
    ];
    this.spinner_label = this.progress[0];

  }
  ngAfterViewInit() {
    this.size = this.progress.length;
    this.timer2 = setInterval(() => {
      this.spinner_label = this.progress[this.count];
      this.count += 1;
      if (this.count === (this.size + 1)) {
        //this.count = 0;
        clearInterval(this.timer2);
      }
    }, 500);
  }

}
