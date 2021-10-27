import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from "@ionic/storage-angular";
import { Iusers } from '../interfaces/iusers';


@Injectable({
  providedIn: 'root',
})
export class LocaldbService {
  usersdb: Iusers[]=[];
  admin: void;
  private _storage: Storage | null = null;
  constructor(private storage: Storage, private platform: Platform) {
    this.init();
    this.getUser();
    this.creartest();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  

  async getUser(){
    const myusersdb = await this.storage.get('usersdb');
    if (myusersdb) {
      this.usersdb = myusersdb;
    }
  }

  creartest(){
    this.platform.ready().then(() => {
      this.usersdb.unshift({strUsers:"aasda",strPass:"test"});
      this._storage.set('usersdb',this.usersdb);
    });
  }

  validLogin(user:string,pass:string) {
    return this.usersdb.find(usr=>usr.strUsers === user && usr.strPass === pass);
  }


  async saveUser(user:string,pass:string){
    const exist=this.usersdb.find(u=>u.strUsers===user);
    if (!exist) {
      this.usersdb.unshift({strUsers:user, strPass:pass});
      this._storage.set('usersdb',this.usersdb);
      console.log('Usuario guardado')
    } else {
      console.log('Usuario ya existe')
    }
  }
}
