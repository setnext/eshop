import { Injectable } from '@angular/core';
import conf from '../config.json'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  contentServiceUrl: string ;
  constructor() {
    console.log('reading');
    this.contentServiceUrl = conf.contentServiceUrl;
   }


}