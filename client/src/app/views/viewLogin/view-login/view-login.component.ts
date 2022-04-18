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
  miFormulario:FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]],

  });


  constructor(private fb:FormBuilder,
    private router:Router,
    private authService:AuthService) { }

  
  login() {
    // this.authService.validarToken()
    // .subscribe(console.log);
   
    const {email,password} = this.miFormulario.value;
    this.authService.login(email, password)
    .subscribe(userlogged =>{
      console.log(userlogged);
      if(userlogged===true){
        this.router.navigateByUrl('/home');
      }else{
        Swal.fire("Error", userlogged, 'error');
      }
    });
  }


}
