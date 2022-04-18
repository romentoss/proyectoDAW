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
  miFormulario:FormGroup = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(1)]],
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]],

  });
  constructor(private fb:FormBuilder,
              private router:Router,
              private authService:AuthService) { }
  register(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
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
