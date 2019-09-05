import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Login } from '../login/shared';
import { AlertService } from '@app/shared/components/alert/alert.service';
import { AuthenticationService } from '../../shared/authentication/authentication.service'; 
import { Helpers } from '@app/helpers';
import { environment } from '@env/environment';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit  {

model = new Login();

error = '';
baseUrlApi: String = `${environment.BaseUrl}api/`;

/*Método construtor da classe*/
constructor(private _router: Router,
            private _alertService: AlertService,
            private _authenticationService: AuthenticationService
            ) { }
  
ngOnInit() {
    //$('body').addClass('empty-layout bg-silver-300');
    //$('body').addClass('empty-layout background-img=');
    //    $('body').css('background-image','url(../assets/img/1.jpg)','no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover;    -o-background-size: cover; background-size: cover;');

  //this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    //$('body').css('class=login-page');

    //$('body').css('background-image','url(../assets/img/1.jpg)');
    //$('body').addClass('login-page');

  // reset login status
  // remove o usuário do armazenamento local para fazer logout do usuário
  localStorage.removeItem ('TokenOrder');
  this._authenticationService.logout();
  //this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
}  

 //@ViewChild(AlertComponent)
 //private alertMensagem: AlertComponent; 
  
/*
  ngAfterViewInit() {
    $('#login-form').validate({
        errorClass: "help-block",
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        highlight: function(e) {
            $(e).closest(".form-group").addClass("has-error")
        },
        unhighlight: function(e) {
            $(e).closest(".form-group").removeClass("has-error")
        },
    });
  }

  ngOnDestroy() {
    $('body').removeClass('empty-layout bg-silver-300');
  }
  */

  logoApp:any = "../../assets/img/logos/App.png";
  logoOrder:any = "../../assets/img/logos/Order"+(Math.floor(Math.random() * (4 - 1 + 1)) + 1).toString().trim()+".png";
  
  private mensagem:boolean = false;    
  redireciona() {
    this._router.navigate(['/index']);
  }
  /*
  validalogin(model) {
    this._authenticationService.login(model)
    .pipe(first())
    .subscribe(
    data => {
    this._router.navigate([this.returnUrl]);
    },
    error => {
    this.error = error;
    this.submitClick = false;
    });
    }
*/    
validalogin() {
    Helpers.setLoading(true);
    this._authenticationService.login(this.model)
    .subscribe(
    data => {
      localStorage.setItem ('TokenOrder', JSON.stringify (data));
      this._router.navigate(['/index']);
    },
    error => {
    this.error = error;
    this._alertService.danger("Acesso inválido",true);
    console.log(error);

    });
    Helpers.setLoading(false);
  }

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

  ngOnDestroy(): void {

  }
}
