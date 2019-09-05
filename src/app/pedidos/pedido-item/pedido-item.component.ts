import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { HelperWindow } from '@app/shared/window';
import { ActivatedRoute, Router } from '@angular/router';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt);

import { Produto,ProdutoService } from '@app/produtos/shared';
import { PedidoItem, Pedido } from '@app/Order/shared';
import { Orderervice } from '../shared';
import { ModalComponent, ModalTipo, ModalIcone, ModalEvento } from '@app/modal';

import { Helpers } from '../../helpers';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidacaoListaComponent } from '@app/shared/validacao-lista';
import { MensagemService } from '@app/mensagem/mensagem.service';

import { EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EasingLogic, PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.component.html',
  styleUrls: ['./pedido-item.component.css'],
  providers: [MatSnackBar],
})

export class PedidoItemComponent implements OnInit {

  @Input()
  itemPedido: PedidoItem[];
  btnProduto:string = " Adicionar na Lista";
  btnFaFaProduto: string = "fa fa-shopping-cart";
  fCurrency: ['BRL','','1.2-2','pt'];
  idStatusPedido: number = 0;

  modelPedidoItem = new PedidoItem();
  modelProduto = new Produto();
  
  model = new Pedido();

  //xmodel = new PedidoItem();

  valorTotalItem: number =(this.modelPedidoItem.valorUnitario*this.modelPedidoItem.qtde);

  valorUnitario: number = null;
  unidadeMedida: string = '';
  valorDescontoCalculado: number = null;
  valorPercentualDesconto: number = null;
  
  decimals: number = 2;
  nroPedido: number = 0;

  loadingOnOff: boolean = false;

  @ViewChild(ModalComponent)
  private msgBox: ModalComponent;

  @ViewChild(ValidacaoListaComponent)
  private validacaoLista: ValidacaoListaComponent;
  
  /*Variaveis para pesquisa do produto no input */
  produtos: Produto[];
  timerPesquisar: any;
  tempoDeEspera = 300;
  produtoSelecionado: Produto = new Produto();

  /*Método construtor da classe*/
/*
  constructor(private _Orderervice: Orderervice, private _produtoService: ProdutoService, private _activeRoute: ActivatedRoute, config: NgbModalConfig, private modalService: NgbModal, private _router: Router, private _mensagemService: MensagemService) { config.backdrop = 'static'; config.keyboard = false; }
*/
public dynamicTargets = ['#infoproduto', '#infoproduto', '#infoproduto'];
public dynamicSelectedTarget = this.dynamicTargets[0];

public myEasing: EasingLogic = (t: number, b: number, c: number, d: number): number => {
  // easeInOutExpo easing
  if (t === 0) {
    return b;
  }
  if (t === d) {
    return b + c;
  }
  if ((t /= d / 2) < 1) {
    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  }

  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}
constructor(@Inject(DOCUMENT) private document: any,
private pageScrollService: PageScrollService,
private snackBar: MatSnackBar,private _Orderervice: Orderervice, private _produtoService: ProdutoService, private _activeRoute: ActivatedRoute, config: NgbModalConfig, private modalService: NgbModal, private _router: Router, private _mensagemService: MensagemService) { config.backdrop = 'static'; config.keyboard = false; }


  /*Carrega algumas informações na inicialização do formulário */
  ngOnInit() {
    const id = this._activeRoute.snapshot.paramMap.get('id');
      if (id !== null && id !== undefined) {
        this.ListarPedidoPorId(Number(id));
     }
  }

  
  public goToLastHeading() {
    // You may use any valid css selector as scroll target (e.g. ids, class selectors, tags, combinations of those, ...)
    // const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '.theEnd');
    const subscriber = new EventEmitter<boolean>();
    subscriber.subscribe((val) => {
      // Reached last heading
    });
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
      scrollFinishListener: subscriber,
    });
  }

  public doSmth(reachedTarget: boolean) {
    let text: string;
    if (reachedTarget) {
      text = 'Yeah, we reached our destination';
    } else {
      text = 'Ohoh, something interrupted us';
    }
    this.snackBar.open(text, 'Ok');
}
  open(content) {
    this.modalService.open(content);
  }

  ListarPedidoPorId(id:number): void{
    this._Orderervice.ListarPedidoPorId(id)
    .subscribe((data: any) => {
      this.model = data;
      this.idStatusPedido = this.model.idStatus;
    });
  }

  b(b:string,c:string) {
    this.btnProduto = b;
    this.btnFaFaProduto = c;
  }

  keyPress(event: any) {
    this.modelPedidoItem.valorDesconto = null;
    this.modelPedidoItem.PercDesconto = null;
  }

  /**
   * Adiciona um novo item na model
   * @param itemPedidoForm Formulário de itens
   * @param modelPedidoItem Entidade de Itens do Pedido
   */
  //adicionar(itemPedidoForm: NgForm, model: PedidoItem): void {
  adicionar(model: PedidoItem): void {

    if (this.validaDadosItem())
    {
      if (this.itemPedido == null) {
        this.itemPedido = [];
      }
      let index:number = -1;
      if (this.modelPedidoItem.guid == null) {
        
        index = this.itemPedido.findIndex(m => m.id === model.id);
      } else {
        index = this.itemPedido.findIndex(m => m.guid === model.guid);
      }
     
      const novoItemPedido = { ...model }; /*{ ... }Operador para clone de objeto*/
      if (index <= -1) {
        this.itemPedido.push(novoItemPedido);
      } else {
        this.itemPedido[index] = novoItemPedido;
      }
      this._mensagemService.success('Adicionado com sucesso',true);
      this.novo();
    }
  }

 /**
   * Limpar a Model
   */
  novo() {

    this.modelPedidoItem = new PedidoItem();
  }

  /**
   * Editar um item do pedido
   * @param model Entidade de item do pedido
   */
  editar(model: PedidoItem) {
    
    this.modelPedidoItem = { ...model }; //TEM QUE CLONAR SENÃO DA ERRO NA API
    this.posicionaItemProduto(model);
  }

  /**
   * Remove um item da lista do pedido
   * @param model Entidade de item do pedido
   */
  remover(model: PedidoItem): void {
      const index = this.itemPedido.indexOf(model, 0);
      if (index > -1) {
        if (model.id > 0) {
          /*Quando o Id da model é diferente de Zero,
            preciso enviar para o Servidor excluir o registro. */
          this.itemPedido[index].excluido = true;
        }
        else {
          /*Quando o Id da model é igual a Zero,
            não preciso enviar para o Servidor excluir o registro, porque o registro ainda não existe. */
            this.itemPedido.splice(index, 1);
        }
      };
  }

  //Calcula o valor do item com desconto fixo
  calculaDescontoFixo(): void {
    if (this.modelPedidoItem.valorDesconto != null && this.modelPedidoItem.qtde != null && this.modelPedidoItem.qtde > 0) {

      this.valorTotalItem = Number(((this.modelPedidoItem.valorUnitario * this.modelPedidoItem.qtde)-this.modelPedidoItem.valorDesconto).toFixed(2));
      this.modelPedidoItem.ValorItem = this.valorTotalItem;     
    }    
  
  }
  //Calcula o valor do item aplicando o percentual de desconto
  calculaPorcentualDesconto(): void {
    //Apura o porcentual de desconto sobre o valor informado
    if (this.modelPedidoItem.PercDesconto != null && this.modelPedidoItem.qtde != null && this.modelPedidoItem.qtde > 0) {

      this.valorDescontoCalculado = Number(((this.modelPedidoItem.valorUnitario * this.modelPedidoItem.qtde * (this.modelPedidoItem.PercDesconto / 100))).toFixed(2));

      //Atualiza a model
      this.modelPedidoItem.valorDesconto = this.valorDescontoCalculado;
      
      this.valorTotalItem = Number(((this.modelPedidoItem.valorUnitario * this.modelPedidoItem.qtde)-this.valorDescontoCalculado).toFixed(2));

      this.modelPedidoItem.ValorItem = this.valorTotalItem;
      this.modelPedidoItem.PercDesconto = null;
      this.valorPercentualDesconto = null;
    }
  }
  //Calcula o valor do item
  calculaValorItem(): void {
    //Apura o valor do item sobre a quantidade informada
    if (this.modelPedidoItem.qtde != null) {
      this.valorTotalItem = ((this.modelPedidoItem.valorUnitario * this.modelPedidoItem.qtde));
      this.modelPedidoItem.ValorItem = Number(this.valorTotalItem.toFixed(2))-this.modelPedidoItem.valorDesconto ;
    }
  }
  
/*========================================
  PESQUISA E SELECIONA PRODUTOS NO PEDIDO
==========================================*/

  /*Pesquisa o produto conforme valor informado no input*/
  public pesquisarProduto($event): void {
    this.loadingOnOff = true;
    clearTimeout(this.timerPesquisar);
    this.timerPesquisar = setTimeout(() => {
      this.carregarProduto($event);
      clearTimeout(this.timerPesquisar);
    }, this.tempoDeEspera);
   
  }  

  /*Carrega a lista de produtos encontrados na pesquisa */
  carregarProduto($event): void {
    this._produtoService.ListarProdutosPorPagina($event, 1, 10, '').subscribe((data: any) => {
      this.produtos = data.produtos; this.loadingOnOff = false;
    });
  }
  /*Posiciona o registro do produto selecionado na combo Produto
    Recebe como parametro o idProduto*/
    posicionaItemProduto($event): void {
      if (this.modelPedidoItem.guid == null) {
        if (this.modelPedidoItem.qtde != null && this.modelPedidoItem.qtde > 0) {
          this.calculaValorItem();
        }
      }
      else {
        Helpers.setLoading(true);      
        this._produtoService
          .ListarProdutoPorId(this.modelPedidoItem.idProduto)
          .subscribe((data: any) => {
          this.produtoSelecionado = data;
          this.valorUnitario = (this.produtoSelecionado.valorUnitario == null ? 0 : this.produtoSelecionado.valorUnitario);
          this.unidadeMedida = (this.produtoSelecionado.unidMedida == null ? '' : this.produtoSelecionado.unidMedida);
          this.modelPedidoItem.valorUnitario = (this.produtoSelecionado.valorUnitario == null ? 0 : this.produtoSelecionado.valorUnitario);
          this.modelPedidoItem.descricao = this.produtoSelecionado.descricao;
          this.decimals = (this.produtoSelecionado.decimalUnidMed == null ? 0 : this.produtoSelecionado.decimalUnidMed);
          if (this.modelPedidoItem.qtde != null && this.modelPedidoItem.qtde > 0) {
            this.calculaValorItem();
            if(this.modelPedidoItem.guid != null) {
              this.pesquisarProduto(this.modelPedidoItem.descricao);
            }
          }
        });
        Helpers.setLoading(false);
      }
    }
   
  //Valida os dados antes de adiconar na lista
  validaDadosItem(): boolean {
    const retorna: boolean = false;
    const title:string = 'Ops... problema nas informações';

    if(this.modelPedidoItem.IdControle == 0 && this.modelPedidoItem.descricao == '') {
      this.msgBox.show('Falta selecionar o produto desejado', title, ModalTipo.Ok,ModalEvento.atencao,ModalIcone.exclamacao);
    }
    else if(this.modelPedidoItem.qtde == 0 || this.modelPedidoItem.qtde == null) {
      this.msgBox.show('Falta informar a quantidade desejada', title, ModalTipo.Ok,ModalEvento.atencao,ModalIcone.exclamacao);
    }
    else if(this.modelPedidoItem.valorDesconto > 0)
    {
      if(this.produtoSelecionado.descontoMaximo < ((this.modelPedidoItem.valorDesconto/(this.modelPedidoItem.valorUnitario*this.modelPedidoItem.qtde))*100)) {
        this.msgBox.show('Desconto não pode ser maior ao permitido no produto', title, ModalTipo.Ok,ModalEvento.atencao,ModalIcone.exclamacao);
      }
      else if(this.modelPedidoItem.valorDesconto >=(this.modelPedidoItem.valorUnitario*this.modelPedidoItem.qtde)) {
        this.msgBox.show('Desconto não pode ser maior ou igual ao preço total do produto', title, ModalTipo.Ok,ModalEvento.atencao,ModalIcone.exclamacao);
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
    HelperWindow.MoverParaCima();
    return retorna;
  }
  ngOnDestroy(): void {
    
    }    
}
