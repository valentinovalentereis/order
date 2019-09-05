import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent implements OnInit, OnDestroy {

  @Input()
  totalItens: Number = 0;

  @Output()
  trocaDePagina: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  trocaDeTotalPorPagina: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  paginaAtual: Number = 1;

  @Input()
  TotalPorPagina = 5;

  rotacao = true;
  maximoPagina = 3;


  TamanhoPaginas = [
    //{ 'total': 0, 'nome': 'TUDO' },
    { 'total': 5, 'nome': '5' },
    { 'total': 10, 'nome': '10' },
    { 'total': 50, 'nome': '50' },
    { 'total': 100, 'nome': '100' },
    //{ 'total': 1000, 'nome': '1000' }
  ];

  constructor() { }

  public ngOnInit() {
  }

  public pageChanged($event: PageChangedEvent): void {
    this.trocaDePagina.emit($event.page);
    this.paginaAtual = $event.page;
  }
  public totalPorPaginaChange(TotalPorPagina: number): void {
    this.trocaDeTotalPorPagina.emit(TotalPorPagina);
  }

  public ngOnDestroy(): void {
    this.trocaDePagina.unsubscribe();
    this.trocaDeTotalPorPagina.unsubscribe();
  }
}
