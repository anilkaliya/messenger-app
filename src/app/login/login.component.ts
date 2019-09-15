import { Component, OnInit } from '@angular/core';
import { NgForm,FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  }
  onSignIn(form:NgForm){
    if(form.invalid){
      return;
    }
    this.userService.signIn(form.value.name,form.value.password);
  }

}
