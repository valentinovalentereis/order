import { Component, OnInit } from '@angular/core';
import { CondicaoPagamento, CondicaoPagamentoService } from '../shared';

@Component ({
  selector: 'app-condicaopagamento-lista',
  templateUrl: './condicaopagamento-lista.component.html',
  styleUrls: ['./condicaopagamento-lista.component.css']
})

export class CondicaoPagamentoListaComponent implements OnInit {

  condicaopagamento: CondicaoPagamento[];
  totalItens = 0;
  pesquisa = '';

  totalPorPagina = 5;
  paginaAtual = 1;

  timerPesquisar: any;
  tempoDeEspera = 500;

  constructor(private _condicaopagamentoService: CondicaoPagamentoService) { }

  ngOnInit() {
    this.carregarCondicaoPagamento();
  }

  carregarCondicaoPagamento(): void {
    this.paginaAtual = (this.paginaAtual === 0 ? 1 : this.paginaAtual);

    this._condicaopagamentoService.ListarCondicaoPagamentoPorPagina(this.pesquisa,
      this.paginaAtual,
      this.totalPorPagina, '')
      .subscribe((data: any) => {
        this.condicaopagamento = data.condicaopagamento;
        this.totalItens = data.totalLinhas;
      });
  }

  public trocaDePagina(pagina: Number) {
    this.paginaAtual = Number(pagina);
    console.log(this.paginaAtual);
    this.carregarCondicaoPagamento();
  }

  public trocaDeTotalPorPagina(totalPorPagina: Number): void {
    this.totalPorPagina = Number(totalPorPagina);
    this.carregarCondicaoPagamento();
  }

  public pesquisar(): void {
    clearTimeout(this.timerPesquisar);

    this.timerPesquisar = setTimeout(() => {
      this.carregarCondicaoPagamento();
      clearTimeout(this.timerPesquisar);
    }, this.tempoDeEspera);

  }
}
