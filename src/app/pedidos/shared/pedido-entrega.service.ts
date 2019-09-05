import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PedidoEntregaService {

  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/pedido/entrega/`;
  constructor(private _http: HttpClient) { }

limpaform(form: NgForm){
  form.reset();
  }
}
