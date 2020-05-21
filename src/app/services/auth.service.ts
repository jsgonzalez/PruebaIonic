import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line: variable-name
  private _usuario: Usuario;
  // tslint:disable-next-line: variable-name
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    console.log(`Email : ${usuario.email} Password : ${usuario.password}`)
    return this.http.post<any>(`${environment.urlAPI}/auth/signin`, usuario);
  }

  guardarUsuario(user): void {

    this._usuario = new Usuario();
    this._usuario.email = user.email;
    this._usuario.id = user._id;

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
      //return JSON.parse(accessToken);
    }
    return null;
  }

  isAuthenticated(): boolean {
    // tslint:disable-next-line: prefer-const
    if (this.token != null && this.usuario.email) {
      return true;
    }

    return false;
  }


  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
