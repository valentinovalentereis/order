import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { IEndereco, Endereco } from '@app/shared/endereco/endereco';
import { PaisService } from '@app/pais/shared/pais.service';
import { CidadeService } from '@app/cidade/shared/cidade.service';
import { EstadoService } from '@app/estado/shared/estado.service';
import { CepService, ICep} from '@app/cep/shared';

import { ModalComponent, ModalResposta, ModalTipo } from '@app/modal';

/*Injeção de dependências*/
@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  protected readonly baseUrlApi: String = `${environment.BaseUrl}api/empresa/endereco/`;

  constructor(private _http: HttpClient,
    private _cepService: CepService,
    private _paisService: PaisService,
    private _estadoService: EstadoService,
    private _cidadeService: CidadeService,
    private _EnderecoService: EnderecoService    
    
    ) {}
    @ViewChild(ModalComponent)
    private msgBox: ModalComponent;
    
    @Input()
    enderecos: IEndereco[] = [];
    
    model: IEndereco = new Endereco();
    
  _iconTpEndereco = ["fa fa-truck","fa fa-building","fa fa-truck","fa fa-money" , "fa fa-street-view","fa fa-industry","fa fa-road","fa fa-road","fa fa-map-marker"];
  lisTpEnderecos = [];
  lisCidades = [];
  lisEstados = [];
  lisPaises = [];
  lisEnderecos = [];
  lisTipoEnderecos = [];
  paises = [];
  estados = [];
  cidades = [];

  /**
   * ListaTpEndereco
   *
   */
  public ListarTpEndereco() {

    const urlApi = `${this.baseUrlApi}ListarTpEndereco`;
    return this._http.get<any[]>(urlApi);
  }

/**
   * Carregar a combobox de estado ou cidade
   * @param tp Tipo: 1 - Estado | 2 - Cidade
   */
  carregarComboEstCid(tp: number, model:string) {
    model = model;
    switch (tp) {
      case 1:
        this.carregarEstado(this.model.idPais);
        break;
      case 2:
        this.carregarCidade(this.model.idEstado);
        break;
      default:
        break;
    }
  }

  /**
   * Carregar a combobox de Países
   */
  carregarPais(): void {
    try {
      this._paisService.ListarPais().subscribe(data => {
        this.lisPaises = data;
      });
    } catch (error) {
      this.msgBox.show('Problema ao listar os países.\nErro:' + error, 'Error');
      console.error(error);
    }
  }
  /**
   * Carregar a combox do estado de acordo com o
   * identificador do país
   * @param idPais Identificador do Pais
   */
  carregarEstado(idPais: number): void {
    try {
      this._estadoService.ListarEstado(idPais).subscribe(data => {
        this.lisEstados = data;
      });
    } catch (error) {
      this.msgBox.show('Problema ao listar os estados.\nErro:' + error, 'Error');
      console.error(error);
    }
  }

  /**
   * Carregar a combobox cidade
   * @param idCidade Identificador da cidade
   */
  carregarCidade(idCidade: number): void {
    this._cidadeService.ListarCidade(idCidade).subscribe(data => {
      this.lisCidades = data;
    });
  }

  /**
   * Carrega a combobox dos tipos do endereços
   */
  carregarTiposEndereco(): void {
    this._EnderecoService.ListarTpEndereco().subscribe(data => {
      this.lisTpEnderecos = data;
    });
  }

  /**
   * Busca a descrição do tipo de endereco pelo Id
   * @param id Identificador do Tipo do Endereço
   */
  toEndereco(id: Number): String {
    let nome: String;
    console.log(id);
    try {
      if (id > 0) {
        const tipo: any = this.lisTpEnderecos.filter(
          t => Number(t.id) === Number(id)
        );
        if (tipo.length > 0) {
          nome = tipo[0].nome;
        }
      }
    } catch (error) {
      console.error(error);
    }

    return nome;
  }

  /**
   * Consulta o CEP
   * @param cep Código de endereço Postal
   */
  consultarCEP(cep: string) {
    try {
      if (cep !== null && cep !== '') {
        this._cepService.buscarCEP(cep).subscribe((c: ICep) => {
          this.model.logradouro = `${c.tipo_logradouro} ${c.logradouro}`;
          this.model.bairro = c.bairro;
          this.model.idPais = 1;
          this.mostrarEstadoCidade(c.uf, c.cidade);
        });
      }
    } catch (err) {
      this.msgBox.show(err, 'Erro', ModalTipo.Ok);
    }
  }

  /**
   * Mostar o estado e a cidade de acordo com os parametros.
   * @param uf Sigla da UF
   * @param cidade Descrição da Cidade
   * @param idUF Identificador da UF
   * @param idCidade Identificador da Cidade
   */
  mostrarEstadoCidade(uf: string = '', cidade: string = '', idUF: number = 0, idCidade: number = 0) {
    this._estadoService
      .ListarEstado(this.model.idPais)
      .toPromise()
      .then((resposta: any[]) => {
        this.lisEstados = resposta;
        this.model.idEstado = this.lisEstados.find(
          x => uf !== '' ? x.sigla === uf : x.id === idUF
        ).id;

        this._cidadeService
          .ListarCidade(this.model.idEstado)
          .toPromise()
          .then((cidades: any[]) => {
            this.lisCidades = cidades;
            this.model.idCidade = this.lisCidades.find(
              x => cidade !== '' ? x.descricao === cidade : x.id === idCidade
            ).id;
          });
      });
  }

}
