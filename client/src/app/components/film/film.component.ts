import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/models/popularMoviesResponseDTO.model';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  @Input() film!: Result;

  foto="https://image.tmdb.org/t/p/w500";

  ngOnInit(): void {
  }

  getFullImgPath(id:string|undefined){
    if(id){ 
      return this.foto + id;
    }
    return 'no foto';  
  }
  
}
