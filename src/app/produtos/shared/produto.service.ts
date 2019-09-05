import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Produto } from '@app/produtos/shared/produto';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  urlBase = 'http://....';
  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/produto/`;

  constructor(private _http: HttpClient) { }

  async ListarProdutoPorIdAsync(id: number): Promise<Produto> {
    let params = new HttpParams();
    params = params.append('id', id.toString());

    return await this._http.get<Produto>(`${this.baseUrlApi}ListarProdutoPorId`, { params: params }).toPromise();
  }

  public ListarProdutoPorId(id: number): Observable<Produto> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    
    return this._http.get<Produto>(`${this.baseUrlApi}ListarProdutoPorId`, { params: params });
  }

 public ListarProdutos(limite: number) {
    let params = new HttpParams();
    params = params.append('limite', limite.toString());

    return this._http.get<Produto[]>(`${this.baseUrlApi}ListarProdutos`, { params: params });
  }

  public ListarProdutosPorPagina(pesquisa: string, pagina: number, totaLinhas: number, orderm: string = '') {
    let params = new HttpParams();
    params = params.append('pesquisa', pesquisa.toString());
    params = params.append('pagina', pagina.toString());
    params = params.append('totaLinhas', totaLinhas.toString());
    params = params.append('orderm', orderm.toString());

    return this._http.get<any[]>(`${this.baseUrlApi}ListarProdutosPorPagina`, { params: params });
  }
}
