import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  collapsed = true;
  //Función para contraer y desplegar el menu en modo movil.
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  // En el contructor requerimos el router para en el caso de logout navegar hasta el login.
  constructor(private router: Router) { }
  // Variable que pasamos al login layout para esconder el boton de logout.
  @Input() public hideLoginButton: boolean = false;
  // Variable con la que comprobamos en este mismo componente si esta logeado. 
  public isLogged!: boolean;
  // ngOnInit(): void {
    
  // }

  //Función encargada del logout, a la hora de hacer logout el localstorage se limpia para no poder acceder a la ruta por url
  // y navegaremos de nuevo al login
  public goToLogin() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }  
}
 


