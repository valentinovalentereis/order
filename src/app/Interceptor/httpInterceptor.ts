import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
//Passa o token com para cada cabeçalho de solicitação http.
export class httpInterceptor implements HttpInterceptor {

 intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

 // Adiciona no cabeçalho de autorização
 
 //Obtem dados do token armazenado no local
 //let tokenInfo = JSON.parse(localStorage.getItem('TokenOrder'));
 let token = localStorage.getItem('TokenOrder');
 
 if (token != null)
 {
   token = token.substring(10);
   token = token.substring(0,token.length-2)
 }

if (token != null) {
   if(request.url != 'http://www.App.com.br/cep/buscarcep.php')
   {
     request = request.clone({
     setHeaders: {
     Authorization: `Bearer ${token}`,
     'Content-Type': 'application/json;charset=utf-8',
     'Access-Control-Allow-Origin':'*',
     'Access-Control-Allow-Headers':'X-Requested-With' 
     //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'

     }
     });
   }
   else
   {
    request = request.clone({
      setHeaders: {
      'Content-Type': 'application/json;charset=utf-8'
      }
      });

      //COLOQUEI ISTO HOJE 09/03/2019
      //request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
      //return newRequest.handle(request).pipe(
          //map((event: HttpEvent<any>) => {
              //if (event instanceof HttpResponse) {
                  //alert(event)                
                  //console.log('event--->>>', event);
              //}
              //return event;
          //}));
      //ATÉ AQUI      
   }
}
  return newRequest.handle(request);
  }
}