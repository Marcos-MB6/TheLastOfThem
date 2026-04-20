import { Component, OnInit } from '@angular/core';
import { AnimalesService } from '../_services/animales.service';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.scss']
})
export class AnimalesComponent implements OnInit {

  constructor(private animalesService: AnimalesService) { }

  ngOnInit(): void {
  }

}
