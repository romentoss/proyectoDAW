import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Result } from './../models/popularMoviesResponseDTO.model';
import { Datum } from './../models/popularMoviesResponseDTO.model';
import { environment } from './../../environments/environment';
import { AuthResponse, Usuario } from './../models/popularMoviesResponseDTO.model';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListasService {
  private baseUrl:string = environment.baseUrl;
  

  constructor(private http:HttpClient
              ) { }

  
  

  public async getAllList(): Promise<SearchGifsResponse> {
    // const headers = new HttpHeaders({'authorization': localStorage.getItem('token')!});
    const url = `${this.baseUrl}api/movies/lists`;
    return this.http.get<SearchGifsResponse>(url).toPromise() 
      
  }

  public async addNewList(name:string):Promise<any>{
    
    const url = `${this.baseUrl}api/movies/addNewList/`;
    let email = localStorage.getItem('email');
    const body = {
      name,
      email
    
    }
    console.log(body);
      return this.http.post<any>(url,body).subscribe();
     
    
  }
  
  public async deleteList(name:string):Promise<any>{
    

    const url = `${this.baseUrl}api/movies/deleteList/?listName=${name}`;
    console.log("hola delete");
    const body = {
      name
    
    }
    console.log(body);
      return this.http.delete<any>(url).subscribe();
     
    
  }
  public async deleteFilm( filmId:string):Promise<any>{
    const url = `${this.baseUrl}api/movies/deleteFromList/?filmName=${ filmId}`;
    console.log("hola delete film");
    const body = {
      filmId
    
    }
    console.log(body);
      return this.http.delete<any>(url).subscribe();
     
    
  }
  
  public async addNewFilmToList(listOwner:string,pelicula:Result):Promise<any>{
    const url = `${this.baseUrl}api/movies/addNewFilm/`;
    console.log("hola aadnewfilm");
    const body = {
      listOwner,
      pelicula
    }
    console.log(body);
      return this.http.post<any>(url,body).subscribe();
     
    
  }

  // registro(name:string,email:string,password:string){
  //   const url = `${this.baseUrl}api/auth/signup`;
  //   const body = {
  //     name,
  //     email,
  //     password
  //   };
  //   //igual que login pero desestructurando
    
  //   return this.http.post<AuthResponse>(url,body)
  //   .pipe(
  //     tap(resp => {
  //       console.log(resp,"heyyy");
  //       if(resp.userlogged){
  //         this._usuario = {
  //           name:resp.name!     
  //         }
  //         localStorage.setItem('token', resp.jwt!);
  //       }
  //     }),
  //     map(resp=> resp.userlogged),
  //     catchError(err => of(err.error.msg) )
  //   );
  // }
}


