import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '@env/environment';

import { CondicaoPagamento } from './condicaopagamento';

@Injectable({
  providedIn: 'root'
})
export class CondicaoPagamentoService {
  urlBase = 'http://....';
  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/condicaopagamento/`;
  protected readonly baseUrlApiEndereco: String = `${environment.BaseUrl}api/condicaopagamento/`;

  constructor(private _http: HttpClient) { }
  public Salvar(c: CondicaoPagamento) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._http.post(`${this.baseUrlApi}salvar`, JSON.stringify(c), { headers: headers });
  }

  /**
   * Lista Condicao de Pagamento
   *
   */

  public ListarCondicao() {
    
    return this._http.get<any[]>(`${this.baseUrlApi}ListarCondicao`);
  }
    public ListarCondicaoPagamentoPorId() {
    
    const urlApi = `${this.baseUrlApi}ListarCondicaoPagamentoPorId`;
    return this._http.get<any[]>(urlApi);
  }
  
  public ListarCondicaoPagamentoPorPagina(pesquisa?: string, pagina?: number, totaLinhas?: number, orderm: string = '') {
    
    let params = new HttpParams();
    params = params.append('pesquisa', pesquisa.toString());
    params = params.append('pagina', pagina.toString());
    params = params.append('totaLinhas', totaLinhas.toString());
    params = params.append('orderm', orderm.toString());
    
    return this._http.get<any[]>(`${this.baseUrlApi}ListarCondicaoPagamentoPorPagina`, { params: params });
  }
}
