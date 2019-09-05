import { Component, OnInit, ViewChild, Input, NgModule } from '@angular/core';
import { Pedido, Orderervice } from '../shared';
import { ModalComponent, ModalResposta, ModalTipo, ModalIcone, ModalEvento } from '@app/modal';
import { Router, RouterModule } from '@angular/router';
import { ValidacaoListaComponent } from '@app/shared/validacao-lista';
import { HelperWindow } from '@app/shared/window';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../shared/authentication/authentication.service';

@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.css']
})
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [PedidoListaComponent]
})
export class PedidoListaComponent implements OnInit {

  Order: Pedido[];
  model = new Pedido();

  totalItens = 0;
  pesquisa = '';

  totalPorPagina = 5;
  paginaAtual = 1;

  timerPesquisar: any;
  tempoDeEspera = 500;

  mouseInColor: string;
  mouseInClick: string;

  constructor(private _Orderervice: Orderervice, private _authenticationService: AuthenticationService, private _router: Router) { }

  ngOnInit() {
    this.carregarPedido();
  }


  @ViewChild(ModalComponent)
  private msgBox: ModalComponent;

  @ViewChild(ValidacaoListaComponent)
  private validacaoLista: ValidacaoListaComponent;
  /*
  OqueFazer(id:number): void {
    const title:string = 'Pedido: '+id;
    let index:number = -1;
    index = this.Order.findIndex(m => m.id === id) 
    if (this.Order[index].idStatus == 0) {
      this.msgBox.show('O que você gostaria de fazer?', title, ModalTipo.OpcaoEdiCanVis,ModalEvento.informacao,ModalIcone.pergunta);
      this.msgBox.resposta.subscribe(resposta => {
        if (resposta === ModalResposta.Novo) {
          this._router.navigate(['/pedido']);
        }
        else if (resposta === ModalResposta.Editar) {
          this._router.navigate(['/pedido', id]);
        }
        else if (resposta === ModalResposta.Cancelar) {
          this.cancelaPedido(id);
        }
      });
    }
    else
    {
      this._router.navigate(['/pedido', id]);
    }
  }
*/

 private carregarPedido(): void {
    this.paginaAtual = (this.paginaAtual === 0 ? 1 : this.paginaAtual);

    this._Orderervice.ListarOrderPorPagina(this.pesquisa,
      this.paginaAtual,
      this.totalPorPagina, '')
      .subscribe((data: any) => {
        this.Order = data.Order;
        this.totalItens = data.totalLinhas;
      });
 }

  public trocaDePagina(pagina: Number) {
    this.paginaAtual = Number(pagina);
    console.log(this.paginaAtual);
    this.carregarPedido();
  }

  public trocaDeTotalPorPagina(totalPorPagina: Number): void {
    this.totalPorPagina = Number(totalPorPagina);
    this.carregarPedido();
  }

  public pesquisar(): void {
    clearTimeout(this.timerPesquisar);

    this.timerPesquisar = setTimeout(() => {
      this.carregarPedido();
      clearTimeout(this.timerPesquisar);
    }, this.tempoDeEspera);

  }
}
