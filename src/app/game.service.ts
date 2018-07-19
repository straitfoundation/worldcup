import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
  game = ELEMENT_DATA;
  constructor() { }
  getGameList(){
    return this.game;
  }
  getMyPublishedGameList(){

  }
}
export interface Element {
  name: string;
  position: number;
  weight: number;
  pool: number;
  gameID: number;
  host: string;
  guest: string;
  time: string;
}

const ELEMENT_DATA: Element[] = [
   {position: 1, name: '张三', weight: 10079, gameID: 1, pool: 280000, host: '法国', guest: '比利时', time:'2018-07-11 2:00'},
   {position: 2, name: 'JACK', weight: 40026, gameID : 2, pool: 280000, host: '克罗地亚', guest: '英格兰', time:'2018-07-12 2:00'},
  {position: 3, name: 'Gabin', weight: 6941, gameID: 3, pool: 280000, host: '比利时', guest: '英格兰', time:'2018-07-14 22:00'},
  {position: 4, name: '名字超级长的人最长', weight: 90122, gameID: 4, pool: 280000, host: '法国', guest: '克罗地亚', time:'2018-07-15 23:00'},

];
