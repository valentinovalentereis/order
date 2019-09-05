import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

/**
 * Pais Service 
 */
@Injectable()
export class PaisService {
  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/pais/`;

  constructor(private _http: HttpClient) { }

  ListarPais() {
    return this._http.get<any[]>(`${this.baseUrlApi}ListarPais`);
  }
}
