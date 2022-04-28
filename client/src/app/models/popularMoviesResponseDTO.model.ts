
    // Tipo de dato para las peliculas que nos devuelve la API
    export interface Result {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }
    // Otros datos que nos facilita la API para poder hacer un carrousel o una paginación
    export interface PopularMoviesResponseDTO {
        page: number;
        results: Result[];
        total_pages: number;
        total_results: number;
    }
    

    // Datos de la autorización 
    export interface AuthResponse {
        userlogged: boolean;
        jwt:        string;
        name:       string;
        data:       Data;
    }
    // Datos que nos provee el JWT decodeado
    export interface Data {
        email: string;
        iat:   number;
    }
    
    // Datos del usuario
    export interface Usuario {
        name:string;
        email?:string;
        password?:string;
    }
    
    // Data general engloba listas y peliculas 
    export interface SearchGifsResponse {
        data: Datum[];
    }
    //Tipo de dato para las listas
    export interface Datum {
        listId:    number;
        listName:  string;
        listOwner: number;
        films?:     Film[];
    }
    // Tipo de dato para las películas
    export interface Film {
        filmId:    number;
        filmUrl:   string;
        filmName:  string;
        filmPhoto: string;
        filmIdMD:  number;
    }
    
    
    
    



