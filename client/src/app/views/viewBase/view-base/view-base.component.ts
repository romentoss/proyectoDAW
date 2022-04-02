import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Result } from 'src/app/models/popularMoviesResponseDTO.model';
import { PeliculaService } from '../../../services/pelicula.service';

@Component({
  selector: 'app-view-base',
  templateUrl: './view-base.component.html',
  styleUrls: ['./view-base.component.scss']
})
export class ViewBaseComponent implements OnInit {
  @ViewChild('carrousel') carrousel!: ElementRef;
  title = 'API peliculas';
  page:number=0; 
  carrouselStep:number= 0;
  lastCarrouselStep:number = 0;
  carrouselStepInPx: number = 300;
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
  ngOnInit(): void {
    this.initPage(1);

    // this.lastCarrouselStep = this.carrousel.nativeElement.offsetWidth
    // console.log("hola",this.carrousel.nativeElement.offsetWidth);
  }
  goNext() {
    this.carrouselStep += 1
    this.moveCarrouse() 
  }

  goPrev() {
    if(this.carrouselStep > 0) {
      this.carrouselStep -= 1 
      this.moveCarrouse()
    }
  }

  moveCarrouse() {
    this.carrousel.nativeElement.style.transform = `translate(-${this.carrouselStep * this.carrouselStepInPx}px)`;
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
      // if(this.page > 1){
        // (document.getElementById('btnBack') as HTMLButtonElement).disabled = false;
        this.page = page-1 %20;
        // console.log(page)
      
        var result =await this.dataSvc.getAll(this.page)
         console.log('Result ',result.results[0]); 
         this.resultadoPeliculas = result.results;
      // }
        // (document.getElementById('btnBack') as HTMLButtonElement).disabled = true;

      
     
      };





}
