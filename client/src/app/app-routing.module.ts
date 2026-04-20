import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { AnimalesComponent } from './animales/animales.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'game', component: GameComponent},
  {path: 'animals', component: AnimalesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
