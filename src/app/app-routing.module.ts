import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatroomComponent } from './chatroom/chatroom.component';


const routes: Routes = [{path:"", component: ChatComponent},
{path:'login',component:LoginComponent},
{path:'signup',component:SignupComponent},
{path:'chatroom',component:ChatroomComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
