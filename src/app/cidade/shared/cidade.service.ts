import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class CidadeService {
  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/cidade/`;

  constructor(private _http: HttpClient) { }

  ListarCidade(idEstado: number) {
    console.log(idEstado);
    let params = new HttpParams();
    params = params.append('id', idEstado.toString());
    return this._http.get<any[]>(`${this.baseUrlApi}ListarCidade`, { params: params });
  }

}
