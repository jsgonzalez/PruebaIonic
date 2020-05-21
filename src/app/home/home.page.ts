import { Component, OnInit } from '@angular/core';
import { CalendarioService } from '../services/calendario.service';
import { Agenda } from '../models/agenda';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  agendas : Agenda[];


  constructor(
    private calendarioService : CalendarioService,
    private alertController : AlertController
  ) {}

  ngOnInit() {
     this.init();
  }

  init(){
    this.calendarioService.getCalendario().subscribe( agendas => {
      this.agendas = agendas;
    });
  }

  ionViewWillEnter(){
    this.init();
  }

  delete(agenda : Agenda){
     this.presentAlertConfirm(agenda);
  }

  async presentAlertConfirm(agenda : Agenda) {
    const alert = await this.alertController.create({
      header: 'Prueba',
      message: `Desea eliminar ${agenda.titulo}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            this.calendarioService.delete(agenda._id).subscribe(
              () => {
                this.init();
                this.presentAlert();
              }
            )}
        }
      ]
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Prueba',
      message: 'Registro eliminado correctamente',
      buttons: ['OK']
    });

    await alert.present();
  }

}
