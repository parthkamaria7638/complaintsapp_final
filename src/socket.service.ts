import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class SocketService {

  account_activity_url: any;
  private socket = io('https://pacific-wildwood-35781.herokuapp.com');
  constructor() { }

  reveivedData() {
    const observable = new Observable<string>(observer => {
        this.socket.on('activity_event', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
      return observable;
    }

    
}

