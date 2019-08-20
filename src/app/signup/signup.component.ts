import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  }
  onSignUp(form:NgForm){
    if(form.invalid){
      return;
    }
    this.userService.signUp(form.value.name,form.value.password);
  }

}
