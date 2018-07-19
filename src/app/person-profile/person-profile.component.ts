import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import { UserService } from '../user.service';
import { User} from '../user';
import {R113_confirmComponent} from '../r113_confirm/r113_confirm.component';
import {TransferComponent} from '../transfer/transfer.component';
import {LoadingComponent} from '../loading/loading.component';
//declare var $: any;
declare var $: any;


@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.css']
})
export class PersonProfileComponent implements OnInit {
  user: User;
  username: string;
  phone: string;
  email: string;
  balance: string;
  address: string;
  sms: string;
  password: string;
  pwd_equal: boolean;
  password_confirm: string;
  loadingDialog: any;

  getUserInfo(): void {
    //this.userService.getUserInfo().subscribe(user => this.user = user);
    //this.userService.getUserInfo().subscribe(user => this.user = user);
    // this.userService.getUserInfo().then(user => this.user = user);
    //this.userService.getUserInfo();
    console.log(this.user);
  }

  constructor(public thisDialogRef: MatDialogRef<PersonProfileComponent>,
              private userService: UserService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.username = this.userService.getUsername();
    this.phone = this.userService.getPhone();
    this.email = this.userService.getEmail();
    this.balance = this.userService.getUserBalance();
    this.address = this.userService.getUserAddress();
    console.log('User address: ' + this.address);
    this.password = '';
    this.password_confirm = '';
    //this.confirm_disabled = true;
    this.sms = '发送验证码';
    //console.log('person_profile: balance: ' + this.balance);
  }
  Confirm() {
    if (this.password !== '' && this.password_confirm !== '' && (this.password_confirm === this.password)) {
      console.log('change password to: ' + this.password);
      this.changePassword();
    } else {
      console.log('两次密码不一致');

      this.snackBar.open('两次密码输入不一致', '请重试', {
        duration: 1000,
        //horizontalPosition: 'left',
        verticalPosition: 'top',
      });
    }

  }
  changePassword(){
    // http://47.95.116.38:9998/user/updatePassword?username=super&password=1234
    this.openLoading();
    $.ajax({
      url: this.userService.getApiUrl() + '/user/updatePassword?username=' + this.username + '&password=' + this.password,
      usrSvc: this.userService,
      instance: this,
      dataType: 'json',
      method: 'POST',
      success: function(data) {
        if (data.username) {
          this.instance.closeLoading();
          this.instance.Cancel();
          //console.log('账户余额： ' + data.data.balance);
          //this.usrSvc.setUserBalance(data.data.balance);
          this.instance.snackBar.open('修改成功', '', {
            duration: 2000,
            //horizontalPosition: 'left',
            verticalPosition: 'top',
          });
        } else {
          console.log(data);
          this.instance.snackBar.open('网络超时', '请重试', {
            duration: 1000,
            //horizontalPosition: 'left',
            verticalPosition: 'top',
          });
          return 0;
        }
      },
      error: function(xhr) {
        // read again
        this.instance.snackBar.open('网络超时', '请重试', {
          duration: 1000,
          //horizontalPosition: 'left',
          verticalPosition: 'top',
        });
      }
    });
  }
  Cancel() {
    this.thisDialogRef.close('Cancel');
  }
  send_sms(){
    this.sms = '发送成功，验证码5分钟有效';
  }
  ngAfterViewInit() {
   // this.getUserInfo();
    //this.Confirm();

    }
  transfer() {
    const dialogRef = this.dialog.open(TransferComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.balance = this.userService.getUserBalance();
      // this.dialogResult = result;
    });
  }
  openLoading () {
    this.loadingDialog = this.dialog.open(LoadingComponent, {
      width: '150px',
      data: '更新用户资料',
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
}
