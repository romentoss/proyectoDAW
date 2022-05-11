import { Film } from './../../models/popularMoviesResponseDTO.model';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Datum, Result } from 'src/app/models/popularMoviesResponseDTO.model';
import { ListasService } from 'src/app/services/listas.service';
import { HttpErrorResponse } from '@angular/common/http';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})

export class FilmComponent implements OnInit {
    @Input() pelicula!: Result;
    resultadoListas:Datum[]=[];
    foto="https://image.tmdb.org/t/p/w500";
    peliculaFormulario:FormGroup= new FormGroup({
    selectedList: new FormControl('', Validators.required)
  });
  // En el Contructor pasamos el servicio dataLists que utilizaremos más tarde,
  // ademas pasamos el ruteo que utilizaremos para hacer las navegaciones correspondientes,
  // en las funciones que necesitemos. 
  constructor(private dataLists:ListasService
              ,private router:Router){}
  // Función correspondiente a la inicialización del formulario con el que añadimos películas,
  // introducimos en este formulario la lista seleccionada en el select y la pasamos por el 
  // validador required el cual nos proporciona la libreria de angular forms. 
  initForm(){
    try {
      this.peliculaFormulario = new FormGroup({
        selectedList: new FormControl(this.resultadoListas[0].listId, Validators.required)
      }); 
    } catch (error) {
      Swal.fire("Error", 'No existen listas para añadir! Crea ya');
      
    }
   
  }
  // Función que se encarga de inicializar las listas, creamos la variable result que es la encargada 
  // de llamar al servicio el cual tiene la función getAllList() que es la encargada de traer los datos, 
  // el en caso de que la data sea diferente a undefined procedemos a la inserción de los datos en el array
  // resultadoListas que ya tiene un tipo definido. En el caso de tener un error lo captura el catch, en el 
  //  caso de contemplar un error de status 403 que en este caso es forbbiden, luego redirigimos al login. 
  async initLists(){
    try {
      var result = await this.dataLists.getAllList();
      if(result.data[0].films != undefined){
      this.resultadoListas = result.data;
      }
    }
    catch (err) {
      if(err instanceof HttpErrorResponse){
        if(err.status == 403){
          localStorage.clear();
          this.router.navigate(['/login']);
        } 
      }  
    } 
  };

  
  //En el inicio necesitamos iniciar las listas y el formulario así que lo haremos desde esta parte.
  async ngOnInit() {
    await this.initLists();
    this.initForm();  
  }
  // Función encargada de hacer la concatenación de la url base para adquirir la foto, en caso de no poseer
  // devolveremos la foto que poseemos en nuestra carpeta assets   
  getFullImgPath(id:string|undefined){
    if(id){ 
      return this.foto + id;
    }
    else{
      return './../../../assets/nofoto.png';  
    } 
  }
  // Función encargada de añadir peliculas, primero desestructuramos el dato selectedList que nos proporciona nuestro
  // formulario de peliculas, luego en forma de await llamamos a nuestro servicio el cual tiene la función para añadir a la lista
  // nos pedirá dos parametros que serian la lista que se ha seleccionado para introducir la pelicula y la propia data de la pelicula.
  async addNewFilm(){
    // const formulario= this.peliculaFormulario.value;
    await this.fetchFilms();  
    
    
   
  } 

  async fetchFilms(){
    const {selectedList} = this.peliculaFormulario.value;
    await this.dataLists.addNewFilmToList(selectedList,this.pelicula);
    const result = this.resultadoListas.map((lista)=>{
      if(lista.listName === selectedList){
        const auxList = lista;
        const auxFilm = {
          filmIdMD:this.pelicula.id,
          filmName:this.pelicula.original_title,
          filmPhoto:this.pelicula.backdrop_path,
          filmUrl:""
        } as Film;
        auxList.films?.push(auxFilm); 
        return auxList;
      }
      return lista;

    });
   
    this.resultadoListas = result;
    location.reload()
    
    
    // this.resultadoListas = result.data;

   
    
    
  }
}
