import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';
import { Login } from "./Login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/`;

  constructor(private _http: HttpClient) { }

  public ValidaLogin(login: Login) {
    /*
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'X-Requested-With' });

    return this._http.post(`${this.baseUrlApi}token`, JSON.stringify(login), { headers: headers });
    */
   
   const httpPostOptions =
   {   
       headers:
           new HttpHeaders (
           {   
               'Content-Type': 'application/json',
               'Access-Control-Allow-Credentials': 'true',
             'Access-Control-Allow-Origin': 'http://localhost:4200',
             'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
             'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Access-Control-Allow-Origin'
           }),
       withCredentials: true,
   }

   return this._http.post(`${this.baseUrlApi}token`, JSON.stringify(login), httpPostOptions);       
  }
}
