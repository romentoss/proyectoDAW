import { NullTemplateVisitor } from '@angular/compiler';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
 
  // peliculas=document.querySelectorAll('.pelicula');
  
  @ViewChild('carrousel') carrousel!:ElementRef;
  @ViewChildren('peliculas') peliculas!:QueryList<ElementRef>;
  carrouselStep:number = 0;
  maxCarrouselStep!:number;


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
    addEventListener('click',(e)=>{
      console.log(e.target);
    })
  }
 
  

// ? ----- ----- Event Listener para la flecha derecha. ----- -----


}
