import { Injectable } from '@angular/core';
import* as CryptoJS from "crypto-js";
const SECRET_KEY = 'alliance-ge';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Encrypt the localstorage data
  encrypt(data: any, storage: string) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      console.log(data)
      localStorage.setItem(storage, data)
  }

  // Decrypt the encrypted data
  decrypt(storage: string) {
      try {
        let data = localStorage.getItem(storage)
        if (data) {
          let decrypted  = CryptoJS.AES.decrypt(data, SECRET_KEY);
          let stringData = decrypted.toString(CryptoJS.enc.Utf8);
          console.log(stringData)
          return true;
        } else {
          return false
        }

      } catch (error) {
        return false
      }

  }
 
}

 