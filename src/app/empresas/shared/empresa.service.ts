import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Empresa } from './empresa';
import { environment } from '@env/environment';

@Injectable()
export class EmpresaService {
  
  urlBase = 'http://....';
  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/empresa/`;
  protected readonly baseUrlApiEndereco: String = `${environment.BaseUrl}api/empresa/endereco/`;

  constructor(private _http: HttpClient) { }

  public Salvar(c: Empresa) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    //console.log(`${JSON.stringify(c)} DADO ENVIADO`);
    return this._http.post(`${this.baseUrlApi}salvar`, JSON.stringify(c), { headers: headers });
  }

  async ListarEmpresaPorIdAsync(id: number): Promise<Empresa> {
    let params = new HttpParams();
    params = params.append('id', id.toString());

  return await this._http.get<Empresa>(`${this.baseUrlApi}ListarEmpresaPorId`, { params: params }).toPromise();
  }

  public ListarEmpresaPorId(id: number): Observable<Empresa> {
    let params = new HttpParams();
    params = params.append('id', id.toString());

    return this._http.get<Empresa>(`${this.baseUrlApi}ListarEmpresaPorId`, { params: params });
  }

 public ListarEmpresas(limite: number) {
    let params = new HttpParams();
    params = params.append('limite', limite.toString());

    return this._http.get<Empresa[]>(`${this.baseUrlApi}ListarEmpresas`, { params: params });
  }
  public ListarTpPessoas() {
    return this._http.get<any[]>(`${this.baseUrlApi}ListarTpPessoas`);
  }
  /*
public ListarTpEmpresas() {
    return this._http.get<any[]>(`${this.baseUrlApi}ListarTpPessoas`);
  }*/

  /*Consome a WebApi para carregar os tipos de endereços
    EnderecoController.cs */
  public ListarTpEndereco() {

    return this._http.get<any[]>(`${this.baseUrlApiEndereco}ListarTpEndereco`);
  }

  public ListarEmpresasPorPagina(pesquisa: string, pagina: number, totaLinhas: number, orderm: string = '') {
    let params = new HttpParams();
    params = params.append('pesquisa', pesquisa.toString());
    params = params.append('pagina', pagina.toString());
    params = params.append('totaLinhas', totaLinhas.toString());
    params = params.append('orderm', orderm.toString());

    return this._http.get<any[]>(`${this.baseUrlApi}ListarEmpresasPorPagina`, { params: params });
  }
}
