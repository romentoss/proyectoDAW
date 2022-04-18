import { ListasService } from './../../../services/listas.service';
import { NullTemplateVisitor } from '@angular/compiler';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Result } from 'src/app/models/popularMoviesResponseDTO.model';
import { PeliculaService } from '../../../services/pelicula.service';
import { Datum,Film } from 'src/app/models/popularMoviesResponseDTO.model';

@Component({
  selector: 'app-view-base',
  templateUrl: './view-base.component.html',
  styleUrls: ['./view-base.component.scss']
})
export class ViewBaseComponent implements OnInit {
  
  title = 'API peliculas';
  page:number=0; 
 
 
  // peliculas=document.querySelectorAll('.pelicula');
  
  @ViewChild('carrousel') carrousel!:ElementRef;
  @ViewChildren('peliculas') peliculas!:QueryList<ElementRef>;
  pelicula = this.peliculas;

  carrouselStep:number = 0;
  maxCarrouselStep!:number;


  foto="https://image.tmdb.org/t/p/w500";
  resultadoPeliculas:Result[]=[]; 
  resultadoListas:Datum[]=[];
  resultadoListasPeliculas:Film[]=[];
  
  // API_URL=`http://api.themoviedb.org/3/movie/popular?api_key=1503085c4d4109b42067460d59344777&page=`+this.page;
  
  
  xhr = new XMLHttpRequest();
   
  
  constructor(
    private dataSvc:PeliculaService,
    private dataLists:ListasService
  ){

  }
  async initLists(){
    
    
     var result =await this.dataLists.getAllList()
      console.log('Result ',result);
      if(result.data[0].films != undefined){
        console.log("Listas",result.data[0]);
        this.resultadoListas = result.data;
      }
      
      
      
    };

    async initFilms(){
    
    
      var result =await this.dataLists.getAllList()
       console.log('Result ',result);
       if(result.data[0].films != undefined){
         console.log("peliculas de lista 1",result.data[0].films);
         this.resultadoListasPeliculas = result.data[0].films;
       }
       
       
       
     };
  

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
  goNext(){
    this.calculateMaxStep();
    if(this.carrouselStep<this.maxCarrouselStep-1){
      this.carrouselStep += 1;  
      this.moveCarrousel();
    }
    
    
    // this.carrousel.nativeElement.scrollLeft += this.carrousel.nativeElement.offsetWidth;
    

    
  }
  goPre(){
    this.calculateMaxStep();
    if(this.carrouselStep>0){
      this.carrouselStep -=1;
      this.moveCarrousel();
    }
   
    
  
    
  }
  calculateMaxStep(){
    const carrouselWidth = this.carrousel.nativeElement.offsetWidth;
    const filmWidth = this.peliculas.first.nativeElement.offsetWidth;
    this.maxCarrouselStep = Math.floor(this.resultadoPeliculas.length/(carrouselWidth/filmWidth));
    console.log(this.maxCarrouselStep);
  }
  moveCarrousel(){
    
    this.carrousel.nativeElement.style.transform=`translate(-${this.carrouselStep*100}vw)`
  }

 
  
  ngOnInit(): void {
    this.initPage(1);
    this.initLists();
    this.initFilms();
    addEventListener('click',(e)=>{
      console.log(e.target);
    })
  }
  redirectTo(){
    location.href = 'www.netflix.com/watch/81193599?trackId=253863245';
  }
  

// ? ----- ----- Event Listener para la flecha derecha. ----- -----


}
