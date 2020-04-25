import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
// create a typings.d.ts file and declare alertifyjs and then register with tsconfig.json

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }
  // create a methods for alertify
  // use this methods in components where we want to show messages

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, (e: any) => {
      if (e){
        okCallback();
      } else {}
    });
  }

  success(message: string){
    alertify.success(message);
  }

  error(message: string){
    alertify.error(message);
  }

  warning(message: string){
    alertify.warning(message);
  }

  message(message: string){
    alertify.message(message);
  }
}
