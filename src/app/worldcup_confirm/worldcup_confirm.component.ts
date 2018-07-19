import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {UserService} from '../user.service';
import { MatSnackBar} from '@angular/material';
import {LoadingComponent} from '../loading/loading.component';
declare var $: any;

@Component({
  selector: 'app-worldcup_confirm',
  templateUrl: './worldcup_confirm.component.html',
  styleUrls: ['./worldcup_confirm.component.css']
})
export class Worldcup_confirmComponent implements OnInit {
  userAddress: string;
  betValue: any;
  coins: any;
  betting: any;
  chainUrl: string;
  loadingDialog: any;
  constructor(public thisDialogRef: MatDialogRef<Worldcup_confirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private userSvc: UserService) { }
  hide = true;
  ngOnInit() {
    console.log(this.data);
    this.userAddress = this.userSvc.getUserAddress();
    this.chainUrl = this.userSvc.getChainUrl();
  }
  betConfirm() {
    this.coins = this.betValue * 100000000;
    // http://47.104.136.172/bet?from=0x3f6e8587a0cd1598fbcd5264cEAB70727D21CB21&gameID=1&value=30&betting=0
    console.log(this.chainUrl + '/bet?from=' + this.userAddress + '&value=' + this.coins + '&gameID=' + this.data[10] + '&betting=' + this.betting);
    this.thisDialogRef.close('bet');
    // this.snackBar.open('正在投注', '请稍等', {
    //   //duration: 3000,
    //   //horizontalPosition: 'left',
    //   verticalPosition: 'top',
    // });
    this.openLoading();
    $.ajax({
      url: this.chainUrl + '/bet?from=' + this.userAddress + '&value=' + this.coins
           + '&gameID=' + this.data[10] + '&betting=' + this.betting,
      instance: this,
      timeout: 120000,
      dataType: 'json',
      method: 'POST',
      success: function(data) {

        if (data.status === '200') {
          console.log('下注成功');
          this.instance.closeLoading();
          this.instance.snackBar.open('投注成功', '祝您好运', {
            duration: 3000,
            //horizontalPosition: 'left',
            verticalPosition: 'top',
          });
        } else {
          console.log(data);
          this.instance.closeLoading();
          this.instance.snackBar.open('网络超时', '请重试', {
            duration: 2000,
            //horizontalPosition: 'left',
            verticalPosition: 'top',
          });
          return 0;
        }
      },
      error: function(xhr) {
        console.log('投注错误:' + JSON.stringify(xhr));
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
  openLoading () {
    this.loadingDialog = this.dialog.open(LoadingComponent, {
      width: '250px',
      data: '努力投注中...',
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
