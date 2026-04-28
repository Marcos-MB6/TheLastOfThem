import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { DialogFichaAnimalComponent } from './dialog-ficha-animal/dialog-ficha-animal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AnimalesComponent } from './animales/animales.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AyudarComponent } from './ayudar/ayudar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    GameComponent,
    BuscadorComponent,
    AnimalesComponent,
    DialogFichaAnimalComponent,
    AyudarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
