import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { PopularMoviesResponseDTO } from '../models/popularMoviesResponseDTO.model';


@Injectable({
  providedIn: 'root',
})
export class PeliculaService{ 
  // En el constructor pasamos el httpclient para realizar las peticiones get. 
  constructor(private http:HttpClient) {}

  // Función para traer de la API de peliculas todas las peliculas por página como promesa.  
  public async getAll(page:number): Promise<PopularMoviesResponseDTO> {
    return this.http.get<PopularMoviesResponseDTO>(`http://api.themoviedb.org/3/movie/popular?api_key=1503085c4d4109b42067460d59344777&page=${page}`).toPromise()   
  }
}
