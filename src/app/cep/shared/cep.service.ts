import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICep } from './cep';

@Injectable()
export class CepService {

  constructor(private _http: HttpClient) { }

  /**
   * Busca por CEP
   * @param cep Código do CEP
   */
  public async buscarCEPAsync(cep: string): Promise<ICep> {

    if (cep.length !== 8) {
      throw new Error('O CEP deve ter 8 caracteres.');
    }

    const _chaveApp: String = '1bCr.mcBXNicLdfT0iXYKzpSXuOjk5/';
    const _URLApp: String = 'http://www.App.com.br/cep/buscarcep.php';

    let params = new HttpParams();

    params = params.append('cep', cep.toString());
    params = params.append('chave', _chaveApp.toString());
    params = params.append('json', '1');


    return await this._http.get<ICep>(_URLApp.toString(), { params: params }).toPromise();
  }

  /**
   * Busca por CEP
   * @param cep Código do CEP
   */
  public buscarCEP(cep: string) {

    if (cep.length !== 8) {
      throw new Error('O CEP deve ter 8 caracteres.');
    }

    const _chaveApp: String = '1bCr.mcBXNicLdfT0iXYKzpSXuOjk5/';
    const _URLApp: String = 'http://www.App.com.br/cep/buscarcep.php';

    let params = new HttpParams();

    params = params.append('cep', cep.toString());
    params = params.append('chave', _chaveApp.toString());
    params = params.append('json', '1');

    return this._http.get<ICep>(_URLApp.toString(), { params: params });
  }
}
