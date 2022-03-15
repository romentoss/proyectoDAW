import { AppComponent } from './../app.component';

import { Injectable, Component, Input} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PopularMoviesResponseDTO } from '../models/popularMoviesResponseDTO.model';


@Injectable({
  providedIn: 'root',
})
export class PeliculaService{

 
  constructor(private http:HttpClient) {
    console.log("serv pelicula");
   }

 
  public async getAll(page:number): Promise<PopularMoviesResponseDTO> {
    return this.http.get<PopularMoviesResponseDTO>(`http://api.themoviedb.org/3/movie/popular?api_key=1503085c4d4109b42067460d59344777&page=${page}`).toPromise()
    
  }
   
 

}
