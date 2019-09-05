import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
 constructor(private authenticationService: AuthenticationService, private router: Router) { }
 
intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

return newRequest.handle(request).pipe(catchError(err =>{
const error = err.error || err.statusText;    

if (err.status === 401) {
    //Se a api retornar a resposta 401, efetua o logout e redireciona para a página de login.
     this.authenticationService.logout();
}
if (err.status === 404) {
    //Se a api retornar a resposta 404, efetua o logout e redireciona para a página de login.
    //alert('ESTÁ CAINDO NA PAGINA NÃO AUTORIZADA');
    this.authenticationService.logout();
} 
if (error == "Unauthorized") {
    //window.alert('Ops... O seu acesso expirou... tente logar novamente');
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
   console.log('ERRO INTERCEPTOR:'+err);
   return Observable.throw(err);
   }));
  }
}