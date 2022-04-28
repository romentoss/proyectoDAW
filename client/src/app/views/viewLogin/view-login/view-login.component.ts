import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.scss']
})
export class ViewLoginComponent{
  // Creamos la variable formulario y hacemos las validaciones. 
  miFormulario:FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]],

  });


  constructor(private fb:FormBuilder,
    private router:Router,
    private authService:AuthService) { }

  // Función encargada de logear al usuario, llamamos al servicio y pasamos los parametros
  // nos suscribimos al observable y o navegamos a la ruta home si todo es correcto o sacamos el error del swal
  login() {
    const {email,password} = this.miFormulario.value;
    localStorage.setItem("email", email);
    this.authService.login(email, password)
    .subscribe(userlogged =>{
      if(userlogged===true){
        this.router.navigateByUrl('/home');
      }else{
        Swal.fire("Error", userlogged, 'error');
      }
    });
  }


}
