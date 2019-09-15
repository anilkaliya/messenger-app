import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

 private chatArray:any[];
  private message:String;
  private messageArray:{message:String,user:String,polarity:String}[]=[];
  private chatroom;
  private selectedUser;
  private user;
  private polarity;
  constructor(private webs:WebsocketService,
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router)
  {
    this.webs.newMessageReceived().subscribe(data => {
    this.messageArray.push(data);
   });

  }  
  ngOnInit() {
    const currentUser=this.userService.getLoggedInUser();
    this.user=currentUser;
    this.selectedUser=this.route.snapshot.queryParamMap.get("name");
    if(this.selectedUser>currentUser){
      this.chatroom=this.selectedUser.concat(currentUser);
    }
    else{
      this.chatroom=currentUser.concat(this.selectedUser);
    }
    this.webs.joinRoom({user:currentUser,room:this.chatroom});
    this.webs.getchats(this.chatroom).subscribe(messages=>{
    this.chatArray=messages;
    });
     }
    //  stringAsDate() {
    //   return Date.now();
    // }
 
  sendMessage(message){
    this.webs.sendMessage({message:message,room:this.chatroom,user:this.user});
  }
 
}
