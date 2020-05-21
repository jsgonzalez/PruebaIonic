import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController : AlertController
    ) { }

    async presentAlert(msg) {
      const alert = await this.alertController.create({
        header: 'Prueba',
        subHeader: '',
        message: msg,
        buttons: ['OK']
      });
  
      await alert.present();
    }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {

          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }

        if (e.status == 403) {
          this.presentAlert(`Hola ${this.authService.usuario.email} no tienes acceso a este recurso!`);
          this.router.navigate(['/']);
        }
        return throwError(e);
      })
    );

   
  }

  
}
