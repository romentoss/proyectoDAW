import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse } from './../models/popularMoviesResponseDTO.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListasService {
  private baseUrl:string = environment.baseUrl;
  

  constructor(private http:HttpClient) { }

  
  

  public async getAllList(): Promise<SearchGifsResponse> {
    // const headers = new HttpHeaders({'authorization': localStorage.getItem('token')!});

  
    const url = `${this.baseUrl}api/movies/lists`;
   
    return this.http.get<SearchGifsResponse>(url).toPromise()   
  }
}


