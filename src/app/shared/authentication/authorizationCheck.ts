import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthorizationCheck implements CanActivate {
 
 constructor(private router: Router) { }
 
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
 //Se o o token existir, o usuário poderá fazer acessar o aplicativo
 if (localStorage.getItem('TokenOrder')) {
    return true;
 }
 
 // Caso contrário, será redirecionado para a página de login
 this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
 return false;
 }
}