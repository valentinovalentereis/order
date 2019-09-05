import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoItemService {
  
  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/pedido/item/`;
  constructor(private _http: HttpClient) { }
}
