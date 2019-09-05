import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { HelperWindow } from '@app/shared/window';

import { NaturezaVendaService } from '@app/naturezavenda/shared/naturezavenda.service';
import { ValidacaoListaComponent } from '@app/shared/validacao-lista';
import { NaturezaVenda } from '@app/naturezavenda/shared/naturezavenda';

@Component({
  selector: 'app-naturezavenda',
  templateUrl: './naturezavenda.component.html',
  styleUrls: ['./naturezavenda.component.css']
})

export class NaturezaVendaComponent implements OnInit {

  model: NaturezaVenda = new NaturezaVenda();

  @ViewChild(ValidacaoListaComponent)
  private validacaoLista: ValidacaoListaComponent;

  lisNaturezaVenda = [];
  constructor(
    private _naturezavendaService: NaturezaVendaService, private _activeRoute: ActivatedRoute, private _router: Router) {}

    ngOnInit() {
  }

  onSubmit(condicaopagamentoForm: NgForm) {
    /* if (naturezavendaForm.valid) {*/
    this._naturezavendaService.Salvar(this.model)
      .subscribe(
        (data) => {
          console.log('id:' + data);
          this._router.navigate(['/naturezavenda/lista']);

        },
        (err: HttpErrorResponse) => {
          this.validacaoLista.ValidaDadosFormulario(err);
          HelperWindow.MoverParaCima();
        }
      );
    /*}*/
  }
  /**
   * Carrega a combobox com natureza de venda
   */
  carregarCondicoesPagamento(): void {
    this._naturezavendaService.ListarNaturezaVenda().subscribe(data => {this.lisNaturezaVenda = data;
    });
  }
}
