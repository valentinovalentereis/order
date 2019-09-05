import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { NaturezaVenda } from './naturezavenda';

@Injectable({
  providedIn: 'root'
})

export class NaturezaVendaService {
  urlBase = 'http://....';
  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/naturezavenda/`;
  protected readonly baseUrlApiEndereco: String = `${environment.BaseUrl}api/naturezavenda/`;
  
  constructor(private _http: HttpClient) { }
  public Salvar(c: NaturezaVenda) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._http.post(`${this.baseUrlApi}salvar`, JSON.stringify(c), { headers: headers });
  }

/**
   * Lista Natureza de Venda
   *
   */

  public ListarNaturezaVenda() {
    
    return this._http.get<any[]>(`${this.baseUrlApi}ListarNatureza`);
  }

  public ListarNaturezaVendaPorId() {
    
    const urlApi = `${this.baseUrlApi}ListarNaturezaVendaPorId`;
    return this._http.get<any[]>(urlApi);
  }
  
  public ListarNaturezaVendaPorPagina(pesquisa?: string, pagina?: number, totaLinhas?: number, orderm: string = '') {
    
    let params = new HttpParams();
    params = params.append('pesquisa', pesquisa.toString());
    params = params.append('pagina', pagina.toString());
    params = params.append('totaLinhas', totaLinhas.toString());
    params = params.append('orderm', orderm.toString());
    
    return this._http.get<any[]>(`${this.baseUrlApi}ListarNaturezaVendaPorPagina`, { params: params });
  }
}
