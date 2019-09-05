import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PedidoEntrega} from '../shared';
import { PaisService } from '../../pais/shared/pais.service';
import { CidadeService } from '../../cidade/shared/cidade.service';
import { EstadoService } from '../../estado/shared/estado.service';
import { CepService, ICep } from '@app/cep/shared';
import { Orderervice } from '../shared';
import { ModalComponent, ModalTipo } from '@app/modal';
import { Pedido } from '@app/Order/shared';

@Component({
  selector: 'app-pedido-entrega',
  templateUrl: './pedido-entrega.component.html',
  styleUrls: ['./pedido-entrega.component.css']
})

/**
* Endereço de Entrega do Pedido
*/
export class PedidoEntregaComponent implements OnInit {

  @Input()  
  entregaPedido: PedidoEntrega[];
  modelPedidoEntrega = new PedidoEntrega();
  idStatusPedido: number = 0;

  @Output() returnModel = new EventEmitter();
  
  @Output('entregaPedidoForm') entregaPedidoForm: NgForm;

  @ViewChild(ModalComponent)
  private msgBox: ModalComponent;

  lisTpEnderecos = [];
  lisCidades = [];
  lisEstados = [];
  lisPaises = [];
  
  model = new Pedido();

  constructor(
    private _cepService: CepService,
    private _paisService: PaisService,
    private _estadoService: EstadoService,
    private _cidadeService: CidadeService,
    private _activeRoute: ActivatedRoute,
    private _Orderervice: Orderervice
  ) { }

  ngOnInit() {
    const id = this._activeRoute.snapshot.paramMap.get('id');
      if (id !== null && id !== undefined) {
        this.ListarPedidoPorId(Number(id));
     }    
    this.carregarPais();
  }

  ListarPedidoPorId(id:number): void{
    this._Orderervice.ListarPedidoPorId(id)
    .subscribe((data: any) => {
      this.model = data;
      this.idStatusPedido = this.model.idStatus;
    });

  }  
  /**
   * Atualiza o item na model
   */
  updateModel(model: PedidoEntrega): void {

    if (this.entregaPedido == null) {
        this.entregaPedido = [];
    }

      this.entregaPedido.splice(0, 1);
      this.returnModel.emit(this.entregaPedido.push(this.modelPedidoEntrega));
  }

  /**
   * Limpar a Model
   */
  newAddress() {
    if (this.entregaPedido.length != 0) {
      this.modelPedidoEntrega.id = this.entregaPedido[0].id;
      this.modelPedidoEntrega.cep = this.entregaPedido[0].cep;
      this.modelPedidoEntrega.logradouro = this.entregaPedido[0].logradouro;
      this.modelPedidoEntrega.bairro = this.entregaPedido[0].bairro;
      this.modelPedidoEntrega.complemento = this.entregaPedido[0].complemento;
      this.modelPedidoEntrega.numero = this.entregaPedido[0].numero;
      this.modelPedidoEntrega.ptoReferencia = this.entregaPedido[0].ptoReferencia;
      this.modelPedidoEntrega.idPais = this.entregaPedido[0].idPais;
      this.modelPedidoEntrega.idEstado = this.entregaPedido[0].idEstado;
      this.modelPedidoEntrega.idCidade = this.entregaPedido[0].idCidade;
      this.carregarEstado(this.entregaPedido[0].idEstado);
      this.carregarCidade(this.entregaPedido[0].idCidade);
      this.posicionaEstadoCidadeCEP(this.entregaPedido[0].cep);      
    }
    else {
      this.modelPedidoEntrega = new PedidoEntrega();
    }
  }

  /**
   * Carregar a combobox de estado ou cidade
   * @param tp Tipo: 1 - Estado | 2 - Cidade
   */
  carregarComboEstCid(tp: number) {

    switch (tp) {
      case 1:
        this.carregarEstado(this.modelPedidoEntrega.idPais);
        break;
      case 2:
        this.carregarCidade(this.modelPedidoEntrega.idEstado);
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
      this.newAddress();
      if (cep !== null && cep !== '') {
        this._cepService.buscarCEP(cep).subscribe((c: ICep) => {
          this.modelPedidoEntrega.cep = cep;
          this.modelPedidoEntrega.logradouro = `${c.tipo_logradouro} ${c.logradouro}`;
          this.modelPedidoEntrega.bairro = `${c.bairro}`;
          this.modelPedidoEntrega.idPais = 1;
          this.modelPedidoEntrega.complemento = '';
          this.modelPedidoEntrega.numero = '';
          this.modelPedidoEntrega.ptoReferencia = '';
          this.mostrarEstadoCidade(c.uf, c.cidade);
          this.updateModel(this.modelPedidoEntrega);
        });
      }
    } catch (err) {
      this.msgBox.show(err, 'Erro', ModalTipo.Ok);
    }
  }

    /**
   * Posiciona Estado Cidade do CEP
   * @param cep Código de endereço Postal
   */
posicionaEstadoCidadeCEP(cep: string) {
    try {
      if (cep !== null && cep !== '') {
        this._cepService.buscarCEP(cep).subscribe((c: ICep) => {
          this.modelPedidoEntrega.cep = cep;
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
      .ListarEstado(this.modelPedidoEntrega.idPais)
      .toPromise()
      .then((resposta: any[]) => {
        this.lisEstados = resposta;
        this.modelPedidoEntrega.idEstado = this.lisEstados.find(
          x => uf !== '' ? x.sigla === uf : x.id === idUF
        ).id;
        
        this._cidadeService
          .ListarCidade(this.modelPedidoEntrega.idEstado)
          .toPromise()
          .then((cidades: any[]) => {
            this.lisCidades = cidades;
            this.modelPedidoEntrega.idCidade = this.lisCidades.find(
              x => cidade !== '' ? x.descricao === cidade : x.id === idCidade
            ).id;
          });
      });
    }
}