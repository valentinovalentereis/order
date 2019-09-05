import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../shared';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[];
  totalItens = 0;
  pesquisa = '';

  totalPorPagina = 5;
  paginaAtual = 1;

  timerPesquisar: any;
  tempoDeEspera = 500;

  constructor(private _clienteService: ClienteService) { }

  ngOnInit() {
    this.carregarCliente();
  }

  carregarCliente(): void {
    this.paginaAtual = (this.paginaAtual === 0 ? 1 : this.paginaAtual);

    this._clienteService.ListarClientesPorPagina(this.pesquisa,
      this.paginaAtual,
      this.totalPorPagina, '')
      .subscribe((data: any) => {
        this.clientes = data.clientes;
        this.totalItens = data.totalLinhas;
      });
  }

  public trocaDePagina(pagina: Number) {
    this.paginaAtual = Number(pagina);
    console.log(this.paginaAtual);
    this.carregarCliente();
  }

  public trocaDeTotalPorPagina(totalPorPagina: Number): void {
    this.totalPorPagina = Number(totalPorPagina);
    this.carregarCliente();
  }

  public pesquisar(): void {
    clearTimeout(this.timerPesquisar);

    this.timerPesquisar = setTimeout(() => {
      this.carregarCliente();
      clearTimeout(this.timerPesquisar);
    }, this.tempoDeEspera);

  }
}
