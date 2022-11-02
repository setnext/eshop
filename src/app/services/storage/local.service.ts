import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  key = "assseerrsseeerrtyuuugghh";

  constructor() { }

  public saveData(key: string, value: string,isEncryptRequired:boolean) {
    if(isEncryptRequired){
      localStorage.setItem(key, this.encrypt(value));

    }
    else{
    localStorage.setItem(key, value);
  }
  }

  public getData(key: string,isDecryptRequired:boolean) {
    if(isDecryptRequired){
    let data = localStorage.getItem(key)|| "";
    return this.decrypt(data);

    }
    else{
    
    return localStorage.getItem(key)
  }
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
