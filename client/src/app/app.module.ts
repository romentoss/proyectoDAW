import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeliculaService } from './services/pelicula.service';
import { HeaderComponent } from './components/header/header.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout/base-layout.component';
import { ViewBaseComponent } from './views/viewBase/view-base/view-base.component';

import { ViewLoginComponent } from './views/viewLogin/view-login/view-login.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout/login-layout.component';
import { FilmComponent } from './components/film/film.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BaseLayoutComponent,
    ViewBaseComponent,
    ViewLoginComponent,
    LoginLayoutComponent,
    FilmComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PeliculaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
