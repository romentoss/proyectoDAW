import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AuthResponse, Usuario } from './../models/popularMoviesResponseDTO.model';
import { environment } from './../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Variable que nos proporciona la ruta base de nuestro server
  private baseUrl:string = environment.baseUrl;
  // Variable del tipo usuario que utilizamos para su creación
  private _usuario!:Usuario;

  // Función que se encarga de retornar los Usuarios
  get usuario(){
    return {...this._usuario};
  }

  constructor(private http:HttpClient) { }
  
  // Función de registro la cual se encarga de recibir los parametros necesarios para hacer un registro en nuestra base de datos,
  // de encarga de completar la url de la petición y generar el body que recibirá nuestro back en el request, devuelve un observable 
  // cuando hacemos la petición post dentro del cual hacemos un tap para igualar al usuario y setear en el local storage el token, el map 
  //  emite el resultado del observable como observable.
  registro(name:string,email:string,password:string){
    const url = `${this.baseUrl}api/auth/signup`;
    const body = {
      name,
      email,
      password
    };
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      tap(resp => {
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
  // Función que se encarga del logeo, recibe los parametros de email y password, seteamos en el localstorage el email el cual necesitaremos más adelante
  // por otro lado construimos la url de la peticion al servidor y contruimos el objeto body para pasarlo a la hora de hacer el post, para que nuestro server 
  // pueda hacer la petición con los datos facilitados, realizamos el tap para comprobar si el usuario esta logged y seteamos el token en el localstorage
  // y realizamos el map para emitir los resultados. 
  login(email:string, password:string){
    localStorage.setItem('email', email);
    const url = `${this.baseUrl}api/auth/login`;
    
    const body = {
      email,
      password
    };
    
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      tap(
        resp => {
          // console.log(resp);
         
          // console.log("dentro del jwt",resp.data.email);
        if(resp.userlogged){
          this._usuario = {
            name:resp.name!     
          }
          localStorage.setItem('token', resp.jwt!);
          // localStorage.setItem('email',resp.data.email);
          
        }
      }
      ),
      map(resp=> resp.userlogged),
      catchError(err => of(err.error.msg) )
    );
  }

  // logout(){
  //   localStorage.clear();
  // }

}
