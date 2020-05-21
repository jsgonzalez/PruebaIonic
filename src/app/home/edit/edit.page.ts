import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/models/agenda';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarioService } from '../../services/calendario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  agenda : Agenda;
  tituloBarra : string;
  menuButton : boolean;
  backButton : boolean;

  constructor(
    private activatedRoute : ActivatedRoute,
    private calendarioService : CalendarioService,
    private router : Router,
    private alertController : AlertController
  ) { }

  ngOnInit() {

    this.agenda = new Agenda();

    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      console.log(id);
      if (id) {
        this.calendarioService.get(id).subscribe( agenda => {
          console.log("Agenda");
          console.log(agenda);

          this.tituloBarra = "Editar";

          this.agenda = agenda;

          this.swithButton(true);

          console.log("Dia");
          console.log(this.agenda.iniciaDia)
        });
      }
      else{
        this.tituloBarra = "Nuevo";
        this.swithButton(false);
      }
    });

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

  swithButton(bol){
    this.backButton = bol;
    this.menuButton = !bol;
  }

  create(){
    this.calendarioService.createAgenda(this.agenda).subscribe( result => {
      this.presentAlert('Registro creado correctamente');
      this.router.navigate(['/']);
    }, error => this.presentAlert('Error'));
  }

  update(id, agenda){
    this.calendarioService.updateAgenda(id, agenda).subscribe( result => {
      this.presentAlert('Registro actualizado correctamente');
      this.router.navigate(['/']);
    }, error => this.presentAlert('Error'));
  }

}
