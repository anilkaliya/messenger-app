import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(private socket:Socket) { } 

  joinRoom(data){
    this.socket.emit('join',data);
  }

  sendMessage(data){
  this.socket.emit('message',data);
  }
  newMessageReceived() {
    const observable = new Observable<{ message: String,user:String,polarity:String}>
    (observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
