import { Component, OnInit } from '@angular/core';
import { Empresa, EmpresaService } from '../shared';

@Component({
  selector: 'app-empresa-lista',
  templateUrl: './empresa-lista.component.html',
  styleUrls: ['./empresa-lista.component.css']
})
export class EmpresaListaComponent implements OnInit {

  empresas: Empresa[];
  totalItens = 0;
  pesquisa = '';

  totalPorPagina = 5;
  paginaAtual = 1;

  timerPesquisar: any;
  tempoDeEspera = 500;

  constructor(private _empresaService: EmpresaService) { }

  ngOnInit() {
    this.carregarEmpresa();
  }

  carregarEmpresa(): void {
    this.paginaAtual = (this.paginaAtual === 0 ? 1 : this.paginaAtual);

    this._empresaService.ListarEmpresasPorPagina(this.pesquisa,
      this.paginaAtual,
      this.totalPorPagina, '')
      .subscribe((data: any) => {
        this.empresas = data.empresas;
        this.totalItens = data.totalLinhas;
      });
  }

  public trocaDePagina(pagina: Number) {
    this.paginaAtual = Number(pagina);
    console.log(this.paginaAtual);
    this.carregarEmpresa();
  }

  public trocaDeTotalPorPagina(totalPorPagina: Number): void {
    this.totalPorPagina = Number(totalPorPagina);
    this.carregarEmpresa();
  }

  public pesquisar(): void {
    clearTimeout(this.timerPesquisar);

    this.timerPesquisar = setTimeout(() => {
      this.carregarEmpresa();
      clearTimeout(this.timerPesquisar);
    }, this.tempoDeEspera);

  }
}
