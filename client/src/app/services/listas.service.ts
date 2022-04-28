import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Result } from './../models/popularMoviesResponseDTO.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListasService {
  // Variable que nos proporciona la ruta base de nuestro server
  private baseUrl:string = environment.baseUrl;
  

  constructor(private http:HttpClient) { }

  
  
  // Función encargada de traer todas las listas desde la url para la petición
  // Get.
  public async getAllList(): Promise<SearchGifsResponse> {
    // const headers = new HttpHeaders({'authorization': localStorage.getItem('token')!});
    const url = `${this.baseUrl}api/movies/lists`;
    return this.http.get<SearchGifsResponse>(url).toPromise() 
  }
  // Función encargada de añadir listas, hacemos una petición post a la url correspondiente 
  // Luego requerimos el email del localStorage, para poder pasarlo por el body al backend
  public async addNewList(name:string):Promise<any>{
    
    const url = `${this.baseUrl}api/movies/addNewList/`;
    let email = localStorage.getItem('email');
    const body = {
      name,
      email
    }
    return this.http.post<any>(url,body).subscribe();  
  }
  
  // Función que se encarga de eliminar listas, pasamos por parametros de la url los datos necesarios
  // realizamos una petición delete a la url construida. 
  public async deleteList(name:string):Promise<any>{
    const url = `${this.baseUrl}api/movies/deleteList/?listName=${name}`;

    return this.http.delete<any>(url).subscribe();
     
    
  }
  // Función que se encarga de eliminar películas, pasamos el id de la pelicula 
  // por parametros en la url construida y realizamos la petición al backend
  public async deleteFilm( filmId:string):Promise<any>{
    const url = `${this.baseUrl}api/movies/deleteFromList/?filmName=${ filmId}`;
    
    return this.http.delete<any>(url).subscribe();
     
    
  }
  // Función que se encarga de añadir películas a una lista, pasamos a la funcion el propietario de la lista
  // y la pelicula y en forma de promesa como las demas peticiones construimos la url y en la petición pasamos
  // por parametros el url y el body.  
  public async addNewFilmToList(listOwner:string,pelicula:Result):Promise<any>{
    const url = `${this.baseUrl}api/movies/addNewFilm/`;
    console.log("hola aadnewfilm");
    const body = {
      listOwner,
      pelicula
    }    
    return this.http.post<any>(url,body).subscribe();
  }
}


