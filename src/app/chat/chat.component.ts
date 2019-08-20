import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {
private users;
isAuthenticated=false;
isAuthsub:Subscription;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users=>{
      this.users=users;
    });
    this.isAuthenticated=this.userService.getIsAuthenticated();
    this.isAuthsub=this.userService.getIsAuthListener()
    .subscribe(isAuthenticated=>{
     this.isAuthenticated=isAuthenticated;

    })
  }
 ngOnDestroy(){
   this.isAuthsub.unsubscribe();
 }



}
