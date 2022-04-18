import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AuthResponse, Usuario } from './../models/popularMoviesResponseDTO.model';
import { environment } from './../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = environment.baseUrl;
  private _usuario!:Usuario;

  get usuario(){
    return {...this._usuario};
  }

  constructor(private http:HttpClient) { }
  proccessloginResponse(){
    
  }
  registro(name:string,email:string,password:string){
    const url = `${this.baseUrl}api/auth/signup`;
    const body = {
      name,
      email,
      password
    };
    //igual que login pero desestructurando
    
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      tap(resp => {
        console.log(resp,"heyyy");
        if(resp.userlogged){
          this._usuario = {
            name:resp.name!     
          }
          localStorage.setItem('token', resp.jwt!);
        }
      }),
      map(resp=> resp.userlogged),
      catchError(err => of(err.error.msg) )
    );
  }

  login(email:string, password:string){
    
    const url = `${this.baseUrl}api/auth/login`;
    const body = {
      email,
      password
    };
    
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      tap(
        resp => {
          console.log(resp);
         
          console.log("dentro del jwt",resp.data.email);
        if(resp.userlogged){
          this._usuario = {
            name:resp.name!     
          }
          localStorage.setItem('token', resp.jwt!);
          localStorage.setItem('email',resp.data.email);
          
        }
      }
      ),
      map(resp=> resp.userlogged),
      catchError(err => of(err.error.msg) )
    );
  }

  logout(){
    localStorage.clear();
  }

}
