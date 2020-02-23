import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthData} from './authData.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private token;
private users;
private userName;
private isAuthListener=new Subject<boolean>();
private isAuthenticated=false;

  constructor(private http:HttpClient,private router:Router) { }
  signIn(name:string,password:string){
    const authData:AuthData={name:name,password:password};
    this.http.post<{token:string,message:string,name:string}>
    ("/api/users/login",authData)
    .subscribe(responseData=>{
      const token=responseData.token;
      this.token=token;
      if(token)
      {this.userName=name;
        this.isAuthenticated=true;
        this.isAuthListener.next(true);
      this.router.navigate(['/']);
    }
    });
  }
  getLoggedInUser(){
   
    return this.userName;
  } 
  getIsAuthenticated(){
    return this.isAuthenticated;
  }
  getIsAuthListener(){
    return this.isAuthListener.asObservable();
  }
  signUp(name:string,password:string){
    const authData:AuthData={name:name,password:password};
    this.http.post<{token:string,message:string}>
    ("/api/users/signup",authData)
    .subscribe(responseData=>{
     
      console.log("signup done");
      this.router.navigate(['/login']);
     
    });
  }

  getAllUsers(){
    return this.http.get("/api/users");
  }
 
}
 