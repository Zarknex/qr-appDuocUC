/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Itokens } from '../interfaces/itokens';


@Injectable({
  providedIn: 'root',
})
export class LocaldbService {
  tokensdb: Itokens[]=[];
  private _storage: Storage | null = null;
  constructor(private storage: Storage, private platform: Platform) {
    this.init();
    this.getTokens();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getTokens(){
    const mytoken = await this.storage.get('token');
    if (mytoken) {
      this.tokensdb = mytoken;
      return mytoken;
    }
  }

  getToken(){
    return !!this.tokensdb.find(t => t.strToken !== undefined);
  }

  validLogin(token: string) {
    return this.tokensdb.find(tkn=>tkn.strToken === token);
  }


  async saveToken(token: any){
    const exist=this.tokensdb.find(u=>u.strToken===token);
    if (!exist) {
      this.tokensdb.unshift({strToken:token});
      this._storage.set('token',this.tokensdb);
      console.log('Token guardado');
    } else {
      console.log('Token ya existe');
    }
  }
}
