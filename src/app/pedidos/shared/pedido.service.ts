import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pedido } from './';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class Orderervice {
  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/pedido/`;

  constructor(private _http: HttpClient) { }

  public Salvar(pedido: Pedido) {

    return this._http.post(`${this.baseUrlApi}salvar`, JSON.stringify(pedido));
  
  }
  async ListarPedidoPorIdAsync(id: number): Promise<Pedido> {

    let params = new HttpParams();
    params = params.append('id', id.toString());
    return await this._http.get<Pedido>( `${this.baseUrlApi}ListarPedidoPorId`, { params: params }).toPromise();
  }

  public ListarPedidoPorId(id: number): Observable<Pedido> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this._http.get<Pedido>(`${this.baseUrlApi}ListarPedidoPorId`, { params: params });
  }

  public ListarOrderPorPagina(pesquisa: string, pagina: number, totaLinhas: number, orderm: string = '') {
    let params = new HttpParams();
    params = params.append('pesquisa', pesquisa.toString());
    params = params.append('pagina', pagina.toString());
    params = params.append('totaLinhas', totaLinhas.toString());
    params = params.append('ordem', orderm.toString());

    return this._http.get<any[]>(`${this.baseUrlApi}ListarOrderPorPagina`, { params: params })
  }
}
