import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Cliente, ClienteService, ClienteEndereco } from '@app/cliente/shared';

import { Pedido, PedidoEntrega, Orderervice } from '@app/Order/shared';
import { CondicaoPagamentoService } from '@app/condicaopagamento/shared';
import { NaturezaVendaService } from '@app/naturezavenda/shared';
import { EnderecoService } from '@app/shared/endereco/shared/endereco.service';

import { PedidoEntregaComponent } from '../pedido-entrega';
import { PedidoEvento } from '../shared/pedido-evento';
import { HelperWindow } from '@app/shared/window';
import { ValidacaoListaComponent } from '@app/shared/validacao-lista';
import { ModalComponent, ModalTipo, ModalIcone, ModalEvento } from '@app/modal';
import { PedidoListaComponent } from '../pedido-lista';

import { Helpers } from '../../helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})

export class PedidoComponent implements OnInit {

  @Input()
  datatarget = "";
  collapseOC= 0;
  isCollapsedAddress = true;  
  itemPedido: Pedido[];

  model = new Pedido();
  modelEndCliente = new ClienteEndereco();
  
  entregaPedido: PedidoEntrega[];
  enderecoPedidoEntrega: void []=[];
  modelPedidoEnderecoEntrega = new PedidoEntrega();

  eventoPedido: PedidoEvento[];
  modelEventoPedido = new PedidoEvento();

  @ViewChild(ModalComponent)
  private msgBox: ModalComponent;
  
  @ViewChild(PedidoEntregaComponent)
  private pee: PedidoEntregaComponent;  

  @ViewChild(ValidacaoListaComponent)
  private validacaoLista: ValidacaoListaComponent;

  @ViewChild(PedidoListaComponent)
  private plc: PedidoListaComponent;  

  lisCondicaoPagto = [];
  lisNaturezaVenda = [];
  lisEnderecoCliente = [];
  lisTpEnderecos = []; 

  /*Variaveis para pesquisa do cliente e produto no input */
  clientes: Cliente[];
  timerPesquisar: any;
  tempoDeEspera = 300;
  clienteSelecionado: Cliente = new Cliente();
  
  nroPedido: number = 0;
  loadingOnOff: boolean = false;
  control: boolean;
  select: any;

  /*Método construtor da classe*/
  constructor( private _activeRoute: ActivatedRoute,private _clienteService: ClienteService, private _condicaoPagamentoService: CondicaoPagamentoService, private _naturezaVendaService: NaturezaVendaService, private  _enderecoService: EnderecoService, private _Orderervice: Orderervice, private _router: Router, private modalService: NgbModal) { 
}

  /*Carrega algumas informações na inicialização do formulário */
  ngOnInit() {
    this._condicaoPagamentoService.ListarCondicao()
        .subscribe((data) => {
        this.lisCondicaoPagto = data;

      });
      this._naturezaVendaService.ListarNaturezaVenda()
        .subscribe((data) => {
        this.lisNaturezaVenda = data;
      });
      this._clienteService.ListarTpEndereco()
        .subscribe(data => {
        this.lisTpEnderecos = data;
      });

      this.model.eventoPedido.push(this.modelEventoPedido);
      this.carregarParams();
  }

  carregarParams(): void {
    const id = this._activeRoute.snapshot.paramMap.get('id');
     if (id !== null && id !== undefined) {
      this.ListarPedidoPorId(Number(id));
    }
  }

  newAddress() {this.pee.newAddress()}
  // função para receber emit
  returnDelivery(returnModel) {

    this.model.idEnderecoEntrega = 0;
  }
  datatargetCtrl(): string {
    const stO = '', stC='#collapseEE';
    this.collapseOC++
    if (this.collapseOC%2 === 0){
      return stO;
    }
    return stC;
  }

  ListarPedidoPorId(id: number): void {
    this._Orderervice.ListarPedidoPorIdAsync(id)
      .then(pedido => {
        this.model = pedido;
        //this.pesquisarCliente(this.model.nomeCliente);
        this.posicionaItemCliente(this.model.idCliente);
       })
  }

  /*=============================
  Seleção de Clientes no pedido
  ===============================*/
  public pesquisarCliente($event): void {
    this.loadingOnOff = true;
    clearTimeout(this.timerPesquisar);
    this.timerPesquisar = setTimeout(() => {
      this.carregarCliente($event);
      clearTimeout(this.timerPesquisar);
    }, this.tempoDeEspera);
  }

  /*Carrega a lista de clientes encontrados na pesquisa */
  carregarCliente($event): void {

    this._clienteService.ListarClientesPorPagina($event, 1, 10, '').subscribe((data: any) => {
      this.clientes = data.clientes; this.loadingOnOff = false;
    });
  }

    /*Posiciona o registro do cliente selecionado na combo Cliente
    Recebe como parametro o idCliente*/
    posicionaItemCliente($event): void {
    this._clienteService
      .ListarClientePorId(this.model.idCliente)
      .subscribe((data: any) => {
        console.log(JSON.stringify(data));
        //this.clientes = data.clientes; this.loadingOnOff = false;
        this.clienteSelecionado = data;
        this.lisEnderecoCliente = data.enderecos;
        this.lisEnderecoCliente.forEach((elemento) => {
        let e: number = parseInt(elemento["tpEndereco"]), i: number = this._enderecoService._iconTpEndereco.length, x: number = (i >= e ? e : i);
        elemento["descTpEndereco"] = 
          this.toEndereco(e);
        elemento["iconTpEndereco"] = 
          this._enderecoService
          ._iconTpEndereco[x];
      });
    });
  }

    /*Posiciona o registro do endereco selecionado na combo Endereço */
    posicionaEnderecoEntrega($event): void {
      
      let obj = this.lisEnderecoCliente.find(obj => obj.idClienteEndereco == 
      this.model.idEnderecoEntrega);
      
      this.enderecoPedidoEntrega = obj;
      this.modelPedidoEnderecoEntrega = obj;
    }

  /**
   * Carregar a combobox de Condições de Pagamentos
   */
  carregarCondicaoPagamento(): void {
    try {
      
      this._condicaoPagamentoService.ListarCondicao().subscribe(data => {
        this.lisCondicaoPagto = data;
      });
    } catch (error) {
      this.msgBox.show('Problema ao listar as condições pagamentos.\nErro:' + error, 'Error');
    }
  }
  /**
   * Carregar a combobox de Condições de Pagamentos
   */
  carregarNaturezaVenda(): void {
    try {
      
      this._naturezaVendaService.ListarNaturezaVenda().subscribe(data => {
        this.lisCondicaoPagto = data;
      });
    } catch (error) {
      this.msgBox.show('Problema ao listar as naturezas de venda.\nErro:' + error, 'Error');
    }
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

  contaQtdeItens(): number {
    let qtdeItens:number = 0;
    this.model.Order.forEach(function (value) {
      if (value.excluido == false) {
        qtdeItens= qtdeItens+1;
      }
    });
    return qtdeItens;
  }

  onSubmit(pedidoForm: NgForm) {
    if (this.validaDados()) {
      Helpers.setLoading(true);
      this._Orderervice.Salvar(this.model)
        .subscribe(
          
          (data) => {
            //console.log('id:' + data);
            this._router.navigate(['/pedido/lista']);
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            this.validacaoLista.ValidaDadosFormulario(err);
            HelperWindow.MoverParaCima();
          }
      );
      Helpers.setLoading(false);
    }
  }
  open(content) {
    this.modalService.open(content);
  }  

  confirmacancelamento(content, id:number): void {
    this.nroPedido = id;
    this.modalService.open(content);
  }
  cancelaPedido() {
    if (this.nroPedido > 0) {
      this._Orderervice.ListarPedidoPorId(this.nroPedido)
      .subscribe((data: any) => {
        this.model = data;
        this.model.idStatus = 2;
        this.model.eventoPedido[0].id = 0;
        this.model.eventoPedido[0].idEvento = 7;
        this._Orderervice.Salvar(this.model)
          .subscribe(
            (data) => {
              this._router.navigate(['/pedido/lista']);
            },
            (err: HttpErrorResponse) => {
              console.log(err);
              this.validacaoLista.ValidaDadosFormulario(err);
              HelperWindow.MoverParaCima();
            }
          );
      });
    }
  }

  validaDados(): boolean {
    const retorna:boolean = false;
    const title:string = 'Ops... problema nas informações';

    if(this.model.idCliente == 0 || this.model.idCliente == null) {
      this.msgBox.show('Falta informar o cliente', title, ModalTipo.Ok,ModalEvento.atencao,ModalIcone.exclamacao);
    }

    else if(this.model.idNaturezaVenda <= 0 || this.model.idNaturezaVenda == null) {
      this.msgBox.show('Falta informar a natureza de venda', title, ModalTipo.Ok,ModalEvento.atencao,ModalIcone.exclamacao);
    }

    else if(this.model.idCondPag <= 0 || this.model.idCondPag == null) {
      this.msgBox.show('Falta informar a condição de pagamento', title, ModalTipo.Ok,ModalEvento.atencao,ModalIcone.exclamacao);
    }

    else if(this.model.nomeComprador.trim().length == 0 || this.model.nomeComprador == null) {
      this.msgBox.show('Falta informar o nome do comprador', title, ModalTipo.Ok,ModalEvento.atencao,ModalIcone.exclamacao);
    }

    else if(this.model.idEnderecoEntrega == 0 && this.model.enderecoEntrega.length == 0) {
      this.msgBox.show('Falta definir um endereço de entrega', title, ModalTipo.Ok, ModalEvento.atencao, ModalIcone.exclamacao);
    }
    else if(this.model.idEnderecoEntrega == 0 && this.modelPedidoEnderecoEntrega.numero == null) {
      this.msgBox.show('Falta definir o número do endereço de entrega', title, ModalTipo.Ok, ModalEvento.atencao, ModalIcone.exclamacao);
    }

    else {
      if(this.contaQtdeItens() == 0) {
        this.msgBox.show('Falta selecionar no mínimo um produto no pedido', title, ModalTipo.Ok,ModalEvento.atencao,ModalIcone.exclamacao);
      }
      else {
        let i: number = 0;
        this.model.Order.forEach(function (value) {
          if (value.valorDesconto == null) {
            value.valorDesconto = 0;
          }
        });
        return true;
      }
    }
    HelperWindow.MoverParaCima();
    return retorna;
  }  
  ngOnDestroy(): void {
  }
}
