import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './_services/user.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'The Last Of Them';

  constructor(private http: HttpClient, private userService:UserService){}

  ngOnInit(): void {
    this.setCurrentUser();

  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');

    if(!userString) return;
    const user: User = JSON.parse(userString);

    this.userService.setCurrentUser(user);
  }
}
