
import { Injectable } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Agenda } from '../models/agenda';
import { AuthService } from './auth.service';

@Injectable()
export class CalendarioService {

  constructor(
      private http : HttpClient,
      private authService : AuthService
  ) { }

  getCalendario() : Observable<Agenda[]>{
    return this.http.get<Agenda[]>(`${environment.urlAPI}/agenda/${this.authService.usuario.id}`);
  }

  get(id) : Observable<Agenda>{
    return this.http.get<Agenda>(`${environment.urlAPI}/agenda/byId/${id}`);
  }

  delete(id) : Observable<any>{
    return this.http.delete<any>(`${environment.urlAPI}/agenda/${id}`);
  }

  createAgenda(agenda : Agenda) : Observable<Agenda> {

    return this.http.post<Agenda>(`${environment.urlAPI}/agenda/${this.authService.usuario.id}`, agenda);
  }

  updateAgenda(id, agenda : Agenda) : Observable<Agenda> {

    return this.http.put<Agenda>(`${environment.urlAPI}/agenda/${id}`, agenda);
  }

}
