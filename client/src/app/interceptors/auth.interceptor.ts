import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}
  // Utilizamos un interceptor que intercepta las llamadas de la clase http de angular
  // y el servidor, basicamente seteamos el header con nuestro token y lo manejamos 
  // para que si obtenemos un 401 que seria unauthorization nos redirija directamente al 
  // login.
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
          
        setHeaders: {
            'authorization': token
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        localStorage.clear();
        this.router.navigate(['login']);
      }
    }));
  }
}