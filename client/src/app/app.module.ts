import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FilmComponent } from './components/film/film.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeliculaService } from './services/pelicula.service';
import { HeaderComponent } from './components/header/header.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout/base-layout.component';
import { ViewBaseComponent } from './views/viewBase/view-base/view-base.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewLoginComponent } from './views/viewLogin/view-login/view-login.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout/login-layout.component';
import { ViewRegisterComponent } from './views/view-register/view-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BaseLayoutComponent,
    ViewBaseComponent,
    ViewLoginComponent,
    LoginLayoutComponent,
    FilmComponent,
    ViewRegisterComponent,
   
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    
  ],
  providers: [PeliculaService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
