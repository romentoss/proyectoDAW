import { ListasService } from 'src/app/services/listas.service';


import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Result } from 'src/app/models/popularMoviesResponseDTO.model';
import { PeliculaService } from '../../../services/pelicula.service';
import { Datum,Film } from 'src/app/models/popularMoviesResponseDTO.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-base',
  templateUrl: './view-base.component.html',
  styleUrls: ['./view-base.component.scss']
})
export class ViewBaseComponent implements OnInit {
  //Variable con el titulo de Nuestra app
  title = 'API peliculas';
  // Variable para la paginación de la api
  page:number=0;
  // creacion de formgroup para validacion de creación de listas. 
  listaFormulario:FormGroup = this.fb.group({
    name: ['',[Validators.required]]
  });
  @ViewChild('carrousel') carrousel!:ElementRef;
  @ViewChildren('peliculas') peliculas!:QueryList<ElementRef>;
  pelicula = this.peliculas;
  carrouselStep:number = 0;
  maxCarrouselStep!:number;
  //Variable que contiene un string con la primera parte de la url para conseguir la foto
  foto="https://image.tmdb.org/t/p/w500";
  resultadoPeliculas:Result[]=[]; 
  resultadoListas:Datum[]=[];
  resultadoListasPeliculas:Film[]=[];
  nuevaLista!:string;
  

  constructor(
    private dataSvc:PeliculaService,
    private dataLists:ListasService,
    private fb:FormBuilder
  ){}

  //Función para inicializar las listas, llamamos al servicio 
  // y comprobamos que nos devuelbe datos. Seguidamente introducimos los datos en 
  // la variable resultadoListas. 
  async initLists(){
    try {
      await this.fetchList();
    } catch (error) {
        Swal.fire("Error", 'No existen listas! Crea ya');
    }
    
  };
  async fetchList(){
    var result =await this.dataLists.getAllList()
    
        this.resultadoListas = result.data;
     
   }
  // Función que se encarga de inicializar las películas , llamamos al servicio 
  // pero esta vez introducimos la data.films en la variable resultadoListasPeliculas. 
  async initFilms(){
    try {
      await this.fetchPeliculas();
    } catch (error) {
      Swal.fire("Error", 'No existen peliculas! Comienza a crear');
    }
    
  };

  async fetchPeliculas(){
    var result =await this.dataLists.getAllList();
    this.resultadoListasPeliculas = result.data[0].films as Film[];
    
  }

 
  
  // Función que se encarga de inicializar la paginación , llamamos al servicio 
  // y en este caso a la función getall le pasamos el numero de pagina correspondiente 
  // los resultados los guardamos en la variable resultadoPeliculas
  async initPage(){
    this.page = 1;
    var result =await this.dataSvc.getAll(this.page) 
    this.resultadoPeliculas = result.results;
  };
  // Función que se encarga de dar la data de la siguiente página de la API 
  // recibe el numero de pagina y lo aumenta en 1, luego llamamos al servicio 
  // para volver a recibir la nuev data. 
  async nextPage(page:number){
    this.page = page+1;
    var result =await this.dataSvc.getAll(this.page)
    this.resultadoPeliculas = result.results;
  };
  // Función para requerir la data de la página anterior, pasamos el numero 
  // de página y preguntamos si esta tiene página anterior para no seguir 
  // en numeros negativos, luego llamamos al server y pasamos los datos para 
  // hacer la petición.
  async oldPage(page:number){
      if(this.page > 1){
        this.page = page-1;
        var result =await this.dataSvc.getAll(this.page)
        this.resultadoPeliculas = result.results;
      }   
  };

  
  // Función que se encarga de ir moviendo el carrousel de manera positiva 
  goNext(){
    this.calculateMaxStep();
    if(this.carrouselStep<this.maxCarrouselStep-1){
      this.carrouselStep += 1;  
      this.moveCarrousel();
    }
  }
  // Función que se encarga de ir moviendo el carrousel de manera negativa
  goPre(){
    this.calculateMaxStep();
    if(this.carrouselStep>0){
      this.carrouselStep -=1;
      this.moveCarrousel();
    }
  }
  // Función para calcular el numero máximo de pasos y el numero de peliculas a mostrar segun el tamaño.
  calculateMaxStep(){
    const carrouselWidth = this.carrousel.nativeElement.offsetWidth;
    const filmWidth = this.peliculas.first.nativeElement.offsetWidth;
    this.maxCarrouselStep = Math.floor(this.resultadoPeliculas.length/(carrouselWidth/filmWidth));
    console.log(this.maxCarrouselStep);
  }
  //Función para mover el carrousel con un estilo de trasnlate para la funcionalidad
  moveCarrousel(){
    
    this.carrousel.nativeElement.style.transform=`translate(-${this.carrouselStep*100}vw)`
  }
  // Función para añadir una nueva lista, llamamos al servicio y le pasamos el parametro del nombre de la nueva lista,
  // luego usamos el ngOnInit para volver a cargar los datos necesarios. 
  newList(){
      const { name } = this.listaFormulario.value;
      this.dataLists.addNewList(name);
      this.ngOnInit();
  }
  // Función para dar el dato de la nueva lista a la variable desde el 
  // change del input. 
  getNewList(nueva:any){
    this.nuevaLista=nueva.value;
  }


 
  // Función de inicio para inicializar los datos y llamar a las funciones inicializadoras. 
  // iniciamos la paginación, las listas y las peliculas
  ngOnInit(): void {
    this.initPage();
    this.initLists();
    this.initFilms();
  }
  
  // Función que se encarga de eliminar listas, llamamos el servicio 
  // le pasamos el nombre de la lista y eliminamos.
  async deleteList(delList:any){
   
    const nombreList= delList._elementRef.nativeElement.value;
    await this.dataLists.deleteList(nombreList);
    await this.fetchList();
    location.reload();
   
    
    
  }
  // Función que se encarga de eliminar peliculas, llamamos el servicio 
  // le pasamos el id de la pelicula y eliminamos.
  async deleteFilm(delFilm:any){
    this.dataLists.deleteFilm(delFilm.value);
   
    await this.fetchList();
    // location.reload();
     
  }


}

