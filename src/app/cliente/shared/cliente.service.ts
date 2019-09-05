import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Cliente } from './cliente';
import { environment } from '@env/environment';

@Injectable()
export class ClienteService {
  
  urlBase = 'http://....';
  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/cliente/`;
  protected readonly baseUrlApiEndereco: String = `${environment.BaseUrl}api/cliente/endereco/`;
  protected readonly baseUrlApiContato: String = `${environment.BaseUrl}api/cliente/contato/`;

  constructor(private _http: HttpClient) { }

  public Salvar(c: Cliente) {
    //console.log(JSON.stringify(c));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._http.post( `${this.baseUrlApi}salvar`, JSON.stringify(c), { headers: headers });
  }

  async ListarClientePorIdAsync(id: number): Promise<Cliente> {

    let params = new HttpParams();

    params = params.append('id', id.toString());

    return await this._http.get<Cliente>( `${this.baseUrlApi}ListarClientePorId`, { params: params }).toPromise();
  }

  public ListarClientePorId(id: number): Observable<Cliente> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this._http.get<Cliente>(`${this.baseUrlApi}ListarClientePorId`, { params: params });
  }

  public ListarClientes(limite: number) {
    let params = new HttpParams();
    params = params.append('limite', limite.toString());

    return this._http.get<Cliente[]>(`${this.baseUrlApi}ListarClientes`, { params: params });
  }

  public ListarTpPessoas() {
    return this._http.get<any[]>(`${this.baseUrlApi}ListarTpPessoas`);
  }

  public ListaIndIE() {
    return this._http.get<any[]>(`${this.baseUrlApi}ListaIndIE`);
  }

  public ListaOptanteSN() {
    return this._http.get<any[]>(`${this.baseUrlApi}ListaOptanteSN`);
  }

  public ListarTpContatos() {
    return this._http.get<any[]>(`${this.baseUrlApiContato}ListarTpContatos`);
  }

  public ListarTpEndereco() {
    return this._http.get<any[]>(`${this.baseUrlApiEndereco}ListarTpEndereco`);
  }

  public ListarClientesPorPagina(pesquisa: string, pagina: number, totaLinhas: number, orderm: string = '') {
    let params = new HttpParams();

    params = params.append('pesquisa', pesquisa.toString());
    params = params.append('pagina', pagina.toString());
    params = params.append('totaLinhas', totaLinhas.toString());
    params = params.append('orderm', orderm.toString());

    return this._http.get<any[]>(`${this.baseUrlApi}ListarClientesPorPagina`, { params: params });
  }
}
