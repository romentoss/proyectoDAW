import { Component, OnInit } from '@angular/core';
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
 
  
  // API_URL=`http://api.themoviedb.org/3/movie/popular?api_key=1503085c4d4109b42067460d59344777&page=`+this.page;
  
  
  xhr = new XMLHttpRequest();
   
  constructor(
    private dataSvc:PeliculaService
  ){
    
    // this.PeliculaService.getPeliculas().subscribe(resp=>{
    //   console.log(resp);
    // })
  }
  async nextPage(page:number){
    this.page = page+1;
     console.log(page)
     var result =await this.dataSvc.getAll(this.page)
      console.log('Result ',result);    
    };
  

  ngOnInit(): void {
  }

}