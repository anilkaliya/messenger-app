import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
   private Messages:{name:String,message:String}[];
  constructor(private socket:Socket,private http:HttpClient) { } 
getchats(chatroom:String){
return this.http.get<any>('/api/chat/'+chatroom);

}

  joinRoom(data){
    this.socket.emit('join',data);
  }
  sendImage(data){
    this.socket.emit('image',data);
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
  newImageReceived() {
    const observable = new Observable<{ image: String,user:String}>
    (observer => {
      this.socket.on('newimage', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
