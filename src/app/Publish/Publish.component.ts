import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { UserService} from '../user.service';
import { MatSnackBar} from '@angular/material';
import {LoadingComponent} from '../loading/loading.component';

declare var $: any;

@Component({
  selector: 'app-Publish',
  templateUrl: './Publish.component.html',
  styleUrls: ['./Publish.component.css']
})
export class PublishComponent implements OnInit {
  games = [
    {value: '世界杯', viewValue: '世界杯'},
    {value: '抢币', viewValue: '抢币'},
    {value: '3D彩', viewValue: '3D彩'},
    {value: '11选3', viewValue: '11选3'},
  ];
  matches = [
    {value: '2018-6-15 23:00', host: '比利时', guest: '英格兰', id: 1},
    {value: '2018-6-15 23:00', host: '法国', guest: '克罗地亚', id: 2},
  ];
  matchselected: any;
  constructor(public thisDialogRef: MatDialogRef<PublishComponent>,
              @Inject(MAT_DIALOG_DATA) public game: string,
              private usrSvc: UserService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }
  hide = true;
  less5 = false;
  balance: any;
  chainURL: string;
  loadingDialog: any;
  ngOnInit() {
    this.chainURL = this.usrSvc.getChainUrl();
    this.balance = this.usrSvc.getUserBalance();
    if (this.balance < 5 ) {
      this.less5 = true;
    } else {
      this.less5 = false;
    }

    //this.balance = this.usrSvc.getUserBalance();

  }
  publish() {
    const from = this.usrSvc.getUserAddress();
    let host: string;
    let guest: string;
    host = this.matches[this.matchselected - 1].host;
    guest = this.matches[this.matchselected - 1].guest;
    console.log('开始发起游戏');
    this.openLoading();
    // this.snackBar.open('游戏创建中......', '请稍候', {
    //   //duration: 5000,
    //   //horizontalPosition: 'left',
    //   verticalPosition: 'top',
    // });
      $.ajax({
        url: this.chainURL + '/createGame?from=' + from + '&host=' + host + '&guest=' + guest,
        timeout: 120000,
        instance: this,
        //usrSvc: this.usrSvc,
        //dialog: this.dialog,
        snackBar: this.snackBar,
        thisDialog: this.thisDialogRef,
        dataType: 'json',
        method: 'POST',
        success: function(data) {
          if (data.status === '200') {
            this.instance.closeLoading();
            console.log('发起成功: ');
            console.log(data);
            this.snackBar.open(host + ' vs. ' + guest, '开盘成功！', {
              duration: 5000,
              //horizontalPosition: 'left',
              verticalPosition: 'top',
            });
            //this.thisDialog.close('发布成功，关闭窗口');
          } else {
            this.instance.closeLoading();
            this.instance.snackBar.open('网络超时', '请重试', {
              duration: 2000,
              //horizontalPosition: 'left',
              verticalPosition: 'top',
            });
            console.log(data);
            return 0;
          }
        },
        error: function(xhr) {
          this.instance.closeLoading();
          this.instance.snackBar.open('网络超时', '请重试', {
            duration: 2000,
            //horizontalPosition: 'left',
            verticalPosition: 'top',
          });
          alert('error:' + JSON.stringify(xhr)); }
      });
    this.thisDialogRef.close('Cancel');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  openLoading () {
    this.loadingDialog = this.dialog.open(LoadingComponent, {
      width: '250px',
      data: '努力开盘中...',
      disableClose: true,
    });
    this.loadingDialog.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
    });
  }
  closeLoading() {
    this.loadingDialog.close();
  }
}
