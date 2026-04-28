import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.userService.currrentUser$.subscribe(usuario=>{
      if(!usuario){
        this.router.navigate(['/']);
      }
    })
  }

}
