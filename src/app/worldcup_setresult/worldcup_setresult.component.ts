import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {UserService} from '../user.service';
import { MatSnackBar} from '@angular/material';
import {LoadingComponent} from '../loading/loading.component';
declare var $: any;

@Component({
  selector: 'app-worldcup_setresult',
  templateUrl: './Worldcup_setresult.component.html',
  styleUrls: ['./worldcup_setresult.component.css']
})
export class Worldcup_setresultComponent implements OnInit {
  userAddress: string;
  betValue: any;
  result: any;
  chainUrl: string;
  loadingDialog: any;

  constructor(public thisDialogRef: MatDialogRef<Worldcup_setresultComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private userSvc: UserService,
              public dialog: MatDialog) { }
  hide = true;
  ngOnInit() {
    console.log(this.data);
    this.userAddress = this.userSvc.getUserAddress();
    this.chainUrl = this.userSvc.getChainUrl();
  }
  openLoading () {
    this.loadingDialog = this.dialog.open(LoadingComponent, {
      width: '250px',
      data: '正在开奖,请稍候...',
      disableClose: true,
    });
    this.loadingDialog.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
    });
  }
  closeLoading() {
    this.loadingDialog.close();
  }
  setResult() {
    this.openLoading();
    // http://47.104.136.172/setgame?from=0x3f6e8587a0cd1598fbcd5264cEAB70727D21CB21&gameID=0&result=0
    // console.log(this.chainUrl + '/bet?from=' + this.userAddress + '&value=' + this.betValue + '&gameID=' + this.data[10] + '&betting=' + this.betting);
    // this.thisDialogRef.close('bet');
    // this.snackBar.open('正在开奖', '请稍候', {
    //   //duration: 3000,
    //   //horizontalPosition: 'left',
    //   verticalPosition: 'top',
    // });
    $.ajax({
      url: this.chainUrl + '/setgame?from=' + this.userAddress + '&result=' + this.result
           + '&gameID=' + this.data[10],
      instance: this,
      timeout: 120000,
      dataType: 'json',
      method: 'POST',
      success: function(data) {
        this.instance.closeLoading();
        if (data.status === '200') {
          console.log('开奖成功');
          this.instance.snackBar.open('开奖成功', '奖金已分配', {
            duration: 3000,
            //horizontalPosition: 'left',
            verticalPosition: 'top',
          });
          this.instance.thisDialogRef.close('succeed');
        } else {
          console.log(data);
          this.instance.snackBar.open('网络超时', '请重试', {
            duration: 2000,
            //horizontalPosition: 'left',
            verticalPosition: 'top',
          });
          return 0;
        }
      },
      error: function(xhr) {
        console.log('开奖出错:' + JSON.stringify(xhr));
        this.instance.closeLoading();
        this.instance.snackBar.open('网络超时', '请重试', {
          duration: 2000,
          //horizontalPosition: 'left',
          verticalPosition: 'top',
        });
      }
    });



  }
  Cancel() {
    this.thisDialogRef.close('Cancel');
  }
}
