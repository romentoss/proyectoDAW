import { Router } from '@angular/router';
import { ViewBaseComponent } from './../../views/viewBase/view-base/view-base.component';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Datum, Film, Result } from 'src/app/models/popularMoviesResponseDTO.model';
import { ListasService } from 'src/app/services/listas.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  @Input() pelicula!: Result;
  resultadoListas:Datum[]=[];
  peliculaFormulario:FormGroup= new FormGroup({
    selectedList: new FormControl('', Validators.required)
   
  });
  
  
  

  constructor(private dataLists:ListasService
              ,private router:Router
              ,private fb:FormBuilder){
               

  }
  
  initForm(){
    console.log(this.resultadoListas);
    this.peliculaFormulario = new FormGroup({
      selectedList: new FormControl(this.resultadoListas[0].listId, Validators.required)
     
    });
   
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

  async ngOnInit() {
   
    
    
    console.log("film", this.pelicula)
    await this.initLists();
    this.initForm();
    
  }

  getFullImgPath(id:string|undefined){
    if(id){ 
      return this.foto + id;
    }else{
      return './../../../assets/nofoto.png';  
    }
    
  }
  async addNewFilm(){
    const formulario= this.peliculaFormulario.value;
    const {selectedList} = this.peliculaFormulario.value;
    console.log(this.pelicula);
    console.log(selectedList);
    await this.dataLists.addNewFilmToList(selectedList,this.pelicula);
    
    location.reload();


    

    
   
    
    
      
       
       
       
     
    

  }
  
}
