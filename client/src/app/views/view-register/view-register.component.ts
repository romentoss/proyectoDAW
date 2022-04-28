import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-register',
  templateUrl: './view-register.component.html',
  styleUrls: ['./view-register.component.scss']
})
export class ViewRegisterComponent {
  // Creamos un form group para el formulario y añadimos las validaciones de angular forms necesarias.
  miFormulario:FormGroup = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(1)]],
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]],

  });
  // En el constructor le pasamos el formbuilder el router y el authservice que utilizaremos en las 
  // funciones. 
  constructor(private fb:FormBuilder,
              private router:Router,
              private authService:AuthService) { }

  // Función encargada de registrar, traemos los datos de forma desestructurada desde el formulario
  // luego llamamos a la función de authservice y requerimos la funcion de registro a la que le pasamos los 
  // parametros necesarios para realizar la petición. Como nos devuelve un observable realizamos el subscribe para 
  // suscribirnos a este, y en el caso de que todo sea correcto con el servicio del router nos dirigimos al dashboard correspondiente. 
  // y en el caso de que salga mal mostraremos un error a travez de la libreria swal. 
  register(){
    // console.log(this.miFormulario.value);
    // console.log(this.miFormulario.valid);
    // this.router.navigateByUrl('/dashboard')
    const {name,email,password} = this.miFormulario.value;
    this.authService.registro(name,email, password)
    .subscribe(ok =>{
      if(ok===true){
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire("Error", ok, 'error');
      }
    });
  }


}
