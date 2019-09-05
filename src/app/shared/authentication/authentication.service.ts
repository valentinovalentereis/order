import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { map } from 'rxjs/operators';
import { Login } from '@app/pages/login/shared';
import { environment } from '@env/environment';
//import { Login } from "./Login"; 


@Injectable()
export class AuthenticationService {
 //constructor(private http: HttpClient) { }
 protected readonly baseUrlApi: String = `${environment.BaseUrl}api/`;

 constructor(private _http: HttpClient) { }
 /*
 login(login: Login) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'X-Requested-With' });
    return this._http.post(`${this.baseUrlApi}token`, JSON.stringify(login), { headers: headers })   
*/
  
 login(login: Login) {
   /*
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin':'*',
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

    



/*
  $http.get('http://example.in/', function (res) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
})...
*/



    //return this.http.post<any>('/api/token', { username, password })
    //.pipe(map(user => {
    // Login bem sucedido se houver um token jwt na resposta
    //console.log(user);
    //if (user.valueOf.length > 0) {
    //    alert('gerou token')
        // armazena detalhes do usuário e token jwt no armazenamento local para manter o usuário
        // logado entre as atualizações da página
        //console.log(JSON.stringify(user));
        //localStorage.setItem('TokenOrder', JSON.stringify(user));
    //}
 
    //return user;
    //}));
 }

// public ValidaLogin(login: Login) {
//    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
//    return this._http.post(`${this.baseUrlApi}token`, JSON.stringify(login), { headers: headers });
 // }


 /*
  validalogin() {
    this._loginService.ValidaLogin(this.model)
      .subscribe(
        (data) => {
          localStorage.setItem ('TokenOrder', JSON.stringify (data));
          this._router.navigate(['/index']);
        },
        (err:HttpErrorResponse) => {
          this._alertService.danger('Usuário ou conta inválida!',true);
          console.log(err);
        }
      )
  }
  */

 
 logout() {
    // remove o token do usuário do local storage quando executa o logout
    localStorage.removeItem('TokenInfo');
    }
}