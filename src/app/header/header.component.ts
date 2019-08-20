import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
 isAuthenticated=false;
 isAuthSub:Subscription;
private token;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.isAuthenticated=this.userService.getIsAuthenticated();
    this.isAuthSub=this.userService.getIsAuthListener().
    subscribe(isAuthenticated=>{
      this.isAuthenticated=isAuthenticated;
    });
  }
  ngOnDestroy(){
    this.isAuthSub.unsubscribe();
  }

}
