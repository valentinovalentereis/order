import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class EstadoService {

  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/estado/`;

  constructor(private _http: HttpClient) { }


  ListarEstado(idPais: number) {
    let params = new HttpParams();
    params = params.append('id', idPais.toString());
    return this._http.get<any[]>(`${this.baseUrlApi}ListarEstado`, { params: params });
  }
}
