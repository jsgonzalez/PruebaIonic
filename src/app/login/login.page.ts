import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario : Usuario;

  constructor(
    private authService : AuthService,
    private router : Router,
    private alertController : AlertController
  ) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.presentAlert(`Hola ${this.authService.usuario.email} ya estás autenticado!`);
      this.router.navigate(['/']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.email == null || this.usuario.password == null) {
      this.presentAlert('Username o password vacías!');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {


      this.authService.guardarUsuario(response.user);
      this.authService.guardarToken(response.token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/']);
      this.presentAlert( `Hola ${usuario.email}, has iniciado sesión con éxito!`);
    }, err => {

      this.presentAlert('Usuario o clave incorrectas!');

    }
    );
  }


  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Prueba',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
