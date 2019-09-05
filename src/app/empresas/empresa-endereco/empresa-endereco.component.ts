import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmpresaEndereco, EmpresaService } from '../shared';
import { PaisService } from '../../pais/shared/pais.service';
import { CidadeService } from '../../cidade/shared/cidade.service';
import { EstadoService } from '../../estado/shared/estado.service';
import { CepService, ICep } from '@app/cep/shared';

import { ModalComponent, ModalResposta, ModalTipo } from '@app/modal';



/**
 * Empresa Endereço Component
 */
@Component({
  selector: 'app-empresa-endereco',
  templateUrl: './empresa-endereco.component.html',
  styleUrls: ['./empresa-endereco.component.css']
})
export class EmpresaEnderecoComponent implements OnInit {
  @Input()
  enderecos: EmpresaEndereco[];
  enderecosExcluidos: EmpresaEndereco[];
  model = new EmpresaEndereco();

  @ViewChild(ModalComponent)
  private msgBox: ModalComponent;

  lisTpEnderecos = [];
  lisCidades = [];
  lisEstados = [];
  lisPaises = [];
  //lisEnderecos = [];

  public isCollapsed; /*Controla o Collapse do endereço*/

  constructor(
    private _empresaService: EmpresaService,
    private _cepService: CepService,
    private _paisService: PaisService,
    private _estadoService: EstadoService,
    private _cidadeService: CidadeService
  ) { }

  ngOnInit() {
    this.isCollapsed = true;
    this.carregarTiposEndereco();
    this.carregarPais();
  }

  /**
   * Adiciona um novo endereço na model
   * @param enderecoForm Formulário de endereço
   * @param model Entidade de Endereço da Empresa
   */
  adicionar(enderecoForm: NgForm, model: EmpresaEndereco): void {
    if (this.enderecos == null) {
      this.enderecos = [];
    }
    let index:number = -1;
    if (this.model.guid == null) {
      index = this.enderecos.findIndex(m => m.id === model.id);
    } else {
      index = this.enderecos.findIndex(m => m.guid === model.guid);
    }
    
    const novoEndereco = { ...model }; /*{ ... }Operador para clone de objeto*/

    if (index <= -1) {
      this.enderecos.push(novoEndereco);
    } else {
      this.enderecos[index] = novoEndereco;
    }
    enderecoForm.reset();
    this.novo();
  }
  
  /**
   * Limpar a Model
   */
  novo() {
    this.model = new EmpresaEndereco();
  }

  /**
   * Editar um endereço
   * @param model Entidade de endereço da empresa
   */
  editar(model: EmpresaEndereco) {
    this.model = { ...model };
    this.mostrarEstadoCidade('', '', this.model.idEstado, this.model.idCidade);
  }

  /**
   * Remove um endereço da lista de endereços
   * @param model Entidade de endereço da empresa
   */
  remover(model: EmpresaEndereco): void {
    //this.msgBox.show('Deseja excluir?', 'Atenção', ModalTipo.SimNao);
    //this.msgBox.resposta.subscribe(resposta => {
      //if (resposta === ModalResposta.Sim) {
        const index = this.enderecos.indexOf(model, 0);
        if (index > -1) {
          if (model.id > 0) {
            /*Quando o Id da model é diferente de Zero,
              preciso enviar para o Servidor excluir o registro. */
            this.enderecos[index].excluido = true;
          } else {
            /*Quando o Id da model é igual a Zero,
              não preciso enviar para o Servidor excluir o registro, porque o registro ainda não existe. */
            this.enderecos.splice(index, 1);
          }
          this.novo();
        }
      //}
    //});
  }

  /**
   * Carregar a combobox de estado ou cidade
   * @param tp Tipo: 1 - Estado | 2 - Cidade
   */
  carregarComboEstCid(tp: number) {
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
    this._empresaService.ListarTpEndereco().subscribe(data => {
      this.lisTpEnderecos = data;
    });
  }
  
  /**
   * Busca a descrição do tipo de endereco pelo Id
   * @param id Identificador do Tipo do Endereço
   */
  toEndereco(id: Number): String {
    let nome: String;
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
