import { Injectable } from '@angular/core';
import { User} from './user';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { user } from './mock-user';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Jsonp } from '@angular/http';
declare var $: any;

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()

export class UserService {
  isLogin: boolean;
  username: string;
  phone: string;
  email: string;
  address: string;
  balance: any;
  chainUrl = 'http://47.104.136.172';
  apiUrl = 'http://47.95.116.38:9998';
  gameListJoined = [];
  gameListPublished = [];
  allGameList = [];
  //private userUrl = 'http://localhost:9998/user/username?username=admin';
  //private localUrl = '/app/test.json';

  constructor(private http: HttpClient) {}

  // getUserInfo(): Observable<User> {
  //   return this.http.get(this.userUrl);
  // }

  getApiUrl () {
    return this.apiUrl;
  }

  getTestValue(): Observable<any> {
    return of(this.isLogin);
}
  getChainUrl(){
    return this.chainUrl;
  }

  setUserBalance(balance: any): void {
    this.balance = balance;
  }
  getUserBalance(): any {
    return this.balance;
  }
  setLoginSucceed(): void {
    this.isLogin = true;
    // this.web3.eth.accounts.create('');
    // web3.providers.HttpProvider('http://localhost:7545');
    // web3.eth.accounts.create();
    // web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));
  }
  setUserAddress(address: string): void {
    this.address = address;
  }
  getUserAddress(): string {
    return this.address;
  }
  setUsername(username: string): void {
    this.username = username;
  }
  getUsername(): string {
    return this.username;
  }
  setPhone(phone: string): void {
    this.phone = phone;
  }
  getPhone(): string {
    return this.phone;
  }
  setEmail(email: string): void {
    this.email = email;
  }
  getEmail(): string {
    return this.email;
}
  logout(): void {
    this.isLogin = false;
    this.username = null;
    this.address = null;
    this.balance = 0;
  }
  getLoginStatus(): boolean {
    return this.isLogin;
  }
  addToJoinedList(game: any) {
    this.gameListJoined.push(game);
  }
  getJoinedList() {
    return this.gameListJoined;
  }
  clearJoinedList() {
    this.gameListJoined = [];
  }
  addToPublishedList(game: any) {
    this.gameListPublished.push(game);
    //console.log('game added in user service: ' + game + ' : ' + this.gameListPublished);
  }
  getPublishedList() {
    return this.gameListPublished;
  }
  clearPublishedList(){
    this.gameListPublished = [];
  }
  getAllGameList() {
    return this.allGameList;
  }
  addToAllGameList(game: any) {
    this.allGameList.push(game);
  }
  clearAllGameList() {
    this.allGameList = [];
  }
}
