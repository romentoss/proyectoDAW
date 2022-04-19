import { Router } from '@angular/router';
import { ViewBaseComponent } from './../../views/viewBase/view-base/view-base.component';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Datum, Result } from 'src/app/models/popularMoviesResponseDTO.model';
import { ListasService } from 'src/app/services/listas.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';





@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  @Input() pelicula!: Result;
  resultadoListas:Datum[]=[];
  constructor(private dataLists:ListasService
              ,private router:Router){

  }

  async initLists(){
    try {
      var result =await this.dataLists.getAllList()
    //  console.log('Result peliculas',result);
     if(result.data[0].films != undefined){
       console.log("Listas",result.data[0]);
       this.resultadoListas = result.data;
     }
      
    } catch (err) {
      console.log(err);
      if(err instanceof HttpErrorResponse){
        if(err.status == 403){
          localStorage.clear();
          this.router.navigate(['/login']);
        }
       
      }
      
    }
    
    
     
     
     
   };
  foto="https://image.tmdb.org/t/p/w500";

  ngOnInit(): void {
    console.log("film", this.pelicula)
    this.initLists();
  }

  getFullImgPath(id:string|undefined){
    if(id){ 
      return this.foto + id;
    }else{
      return './../../../assets/nofoto.png';  
    }
    
  }
  
}
