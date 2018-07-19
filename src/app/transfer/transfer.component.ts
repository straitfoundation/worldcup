import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {UserService} from '../user.service';
import {User} from '../user';
import {LoadingComponent} from '../loading/loading.component';
declare var $: any;

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  username: string;
  password: string;
  chainUrl: string;
  apiUrl: string;
  to: string;
  toAddress: string;
  value: number;
  coins: number;
  from: string;
  btn_disabled: boolean;
  loadingDialog: any;
  constructor(public thisDialogRef: MatDialogRef<TransferComponent>,
              private userService: UserService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }
  hide = true;
  balance: any;

  ngOnInit() {
    //this.username = 'super';
    this.balance = this.userService.getUserBalance();
    this.chainUrl = this.userService.getChainUrl();
    this.from = this.userService.getUserAddress();
    this.apiUrl = this.userService.getApiUrl();
    this.btn_disabled = false;
  }

  transferIf() {
    if (this.value > this.balance) {
      console.log('超过用户余额');
      this.snackBar.open('余额不足', '', {
        duration: 3000,
        //horizontalPosition: 'left',
        verticalPosition: 'top',
      });
    } else {
      this.transfer();
    }
  }
  transfer() {
    this.btn_disabled = true;

    const getUserInfoUrl = this.apiUrl + '/user/username?username=';
    this.coins = this.value * 100000000;
    //get to address
    $.ajax({
      url: getUserInfoUrl + this.to,
      instance: this,
      timeout: 120000,
      dataType: 'json',
      method: 'GET',
      success: function(data) {
        if (data.useraddress){
          this.instance.openLoading();
          console.log('to 用户地址: ' + data.useraddress);
          this.instance.toAddress = data.useraddress;
          this.instance.PostToTransfer();
        } else {
          console.log(data);
          this.instance.btn_disabled = false;
          this.instance.snackBar.open('用户 ' + this.instance.to + ' 不存在', '请确认用户名后重试', {
            duration: 3000,
            //horizontalPosition: 'left',
            verticalPosition: 'top',
          });
        }
      },
      error: function(xhr) {
        this.instance.btn_disabled = false;
        this.instance.snackBar.open('网络错误', '请稍后重试', {
          duration: 3000,
          //horizontalPosition: 'left',
          verticalPosition: 'top',
        });
        console.log('error:' + JSON.stringify(xhr));
      }
    });
    // http://47.104.136.172/transfer?from=0x22bcca213d04fdf51ff14915a8877172f0b3d8de&to=0x401c4cA06e7E6E2bdCC232600C4c5090976ABe12&value=2200000000
  }
  PostToTransfer() {
    //this.from = '0x22bcca213d04fdf51ff14915a8877172f0b3d8de';
    const transferURL = this.userService.getChainUrl()
                        + '/transfer?from=' + this.from
                        + '&to=' + this.toAddress
                        + '&value=' + this.coins;
    console.log('Post request: ' + transferURL);
    $.ajax({
      url: transferURL,
      instance: this,
      dataType: 'json',
      method: 'POST',
      success: function(data) {
        this.instance.btn_disabled = false;
        this.instance.closeLoading();
        this.instance.close();
        if (data.tx) {
          console.log(data);
          this.instance.userService.setUserBalance(this.instance.balance - this.instance.value);
          this.instance.snackBar.open('转账成功！', '', {
            duration: 3000,
            //horizontalPosition: 'left',
            verticalPosition: 'top',
          });
        } else {
          console.log('error: ' + data);
        }
      },
      error: function(xhr) {
        this.instance.closeLoading();
        this.instance.btn_disabled = false;
        this.instance.snackBar.open('网络错误', '请稍后重试', {
          duration: 5000,
          //horizontalPosition: 'left',
          verticalPosition: 'top',
        });
        console.log('error:' + JSON.stringify(xhr));
      }
    });
  }
  close() {
    this.thisDialogRef.close('Cancel');
  }
  openLoading () {
    this.loadingDialog = this.dialog.open(LoadingComponent, {
      width: '250px',
      data: '转账中，请稍候...',
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
