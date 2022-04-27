

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

    export interface PopularMoviesResponseDTO {
        page: number;
        results: Result[];
        total_pages: number;
        total_results: number;
    }
    


    export interface AuthResponse {
        userlogged: boolean;
        jwt:        string;
        name:       string;
        data:       Data;
    }
    
    export interface Data {
        email: string;
        iat:   number;
    }
    
    
    export interface Usuario {
        name:string;
        email?:string;
        password?:string;
        
    }
  

    export interface SearchGifsResponse {
        data: Datum[];
    }
    
    export interface Datum {
        listId:    number;
        listName:  string;
        listOwner: number;
        films?:     Film[];
    }
    
    export interface Film {
        filmId:    number;
        filmUrl:   string;
        filmName:  string;
        filmPhoto: string;
        filmIdMD:  number;
    }
    
    
    
    



