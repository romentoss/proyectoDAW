import { NullTemplateVisitor } from '@angular/compiler';
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
 
  peliculas=document.querySelectorAll('.pelicula');
  flechaIzquierda:HTMLElement|null=document.getElementById('flecha-izquierda');
  flechaDerecha:HTMLElement|null=document.getElementById('flecha-derecha');
  fila!:HTMLElement;


  foto="https://image.tmdb.org/t/p/w500";
  resultadoPeliculas:Result[]=[]; 
  
  // API_URL=`http://api.themoviedb.org/3/movie/popular?api_key=1503085c4d4109b42067460d59344777&page=`+this.page;
  
  
  xhr = new XMLHttpRequest();
   
  
  constructor(
    private dataSvc:PeliculaService
  ){

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
        this.page = page-1;
        console.log(page)
        var result =await this.dataSvc.getAll(this.page)
         console.log('Result ',result.results[0]); 
         this.resultadoPeliculas = result.results;
      }
      

      
     
      };

  getFullImgPath(id:string|undefined){
    if(id){ 
      return this.foto + id;
    }
    return 'no foto';
    
  }

  
  
  ngOnInit(): void {
    this.initPage(1);
    this.fila = document.querySelector('.contenedor-carousel') as HTMLElement;
    const peliculas = document.querySelectorAll('.pelicula');
    
    
    let botonderecho = document.getElementById('flecha-derecha');
    let botonizquierdo = document.getElementById('flecha-izquierda');

    botonderecho!.addEventListener('click',()=>{
        this.fila.scrollLeft += this.fila.offsetWidth;
        const indicadorActivo = document.querySelector('.indicadores .activo')! as HTMLElement;
        if(!indicadorActivo){
          return;
        }else{
          if(indicadorActivo.nextElementSibling){
          	indicadorActivo.nextElementSibling.classList.add('activo');
          	indicadorActivo.classList.remove('activo');
          }
        }
       
    })
    botonizquierdo!.addEventListener('click',()=>{
      this.fila.scrollLeft -= this.fila.offsetWidth;
      const indicadorActivo = document.querySelector('.indicadores .activo')! as HTMLElement;
      if(!indicadorActivo){ 
          return;
      }else{
        if(indicadorActivo!.nextElementSibling){
          indicadorActivo.nextElementSibling.classList.add('activo');
          indicadorActivo.classList.remove('activo');
        }
      }
     
  })
    addEventListener('click',(e)=>{
      
      console.log(e.target);
    })
  }
 
  

// ? ----- ----- Event Listener para la flecha derecha. ----- -----


}
