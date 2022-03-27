import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/popularMoviesResponseDTO.model';
import { PeliculaService } from '../../../services/pelicula.service';

@Component({
  selector: 'app-view-base',
  templateUrl: './view-base.component.html',
  styleUrls: ['./view-base.component.scss']
})
export class ViewBaseComponent implements OnInit {
  title = 'API peliculas';
  page:number=0; 
 
  foto="https://image.tmdb.org/t/p/w500";
  resultadoPeliculas:Result[]=[]; 
  
  // API_URL=`http://api.themoviedb.org/3/movie/popular?api_key=1503085c4d4109b42067460d59344777&page=`+this.page;
  
  
  xhr = new XMLHttpRequest();
   
  constructor(
    private dataSvc:PeliculaService
  ){
    
    // this.PeliculaService.getPeliculas().subscribe(resp=>{
    //   console.log(resp);
    // })
  }
  async initPage(page:number){
    this.page = 1;
     console.log(page)
     var result =await this.dataSvc.getAll(this.page)
      console.log('Result ',result.results[0]); 
      this.resultadoPeliculas = result.results;
    };
  async nextPage(page:number){
    this.page = page+1;
     console.log(page)
     var result =await this.dataSvc.getAll(this.page)
      console.log('Result ',result.results[0]); 
      this.resultadoPeliculas = result.results;
    };
  async oldPage(page:number){
      if(this.page > 1){
        // (document.getElementById('btnBack') as HTMLButtonElement).disabled = false;
        this.page = page-1;
        console.log(page)
        var result =await this.dataSvc.getAll(this.page)
         console.log('Result ',result.results[0]); 
         this.resultadoPeliculas = result.results;
      }
        // (document.getElementById('btnBack') as HTMLButtonElement).disabled = true;

      
     
      };

  getFullImgPath(id:string|undefined){
    if(id){ 
      return this.foto + id;
    }
    return 'no foto';
    
  }
  

  ngOnInit(): void {
    this.initPage(1);
  }

}
