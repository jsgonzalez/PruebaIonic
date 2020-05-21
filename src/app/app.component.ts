import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate : any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    private authService : AuthService 
  ) {
    this.initializeApp();
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title: "Nuevo",
        url : "/home/edit",
        icon : "create-outline"
      }
    ]
  }

  logout(): void {
    let email = this.authService.usuario.email;
    this.authService.logout();  
    this.router.navigate(['/login']);
  }
}
