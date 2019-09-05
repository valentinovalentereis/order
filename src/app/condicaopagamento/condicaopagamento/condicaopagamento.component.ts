import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { HelperWindow } from '@app/shared/window';

import { CondicaoPagamentoService } from '@app/condicaopagamento/shared/condicaopagamento.service';
import { ValidacaoListaComponent } from '@app/shared/validacao-lista';
import { CondicaoPagamento } from '@app/condicaopagamento/shared/condicaopagamento';

@Component({
  selector: 'app-condicaopagamento',
  templateUrl: './condicaopagamento.component.html',
  styleUrls: ['./condicaopagamento.component.css']
})

export class CondicaoPagamentoComponent implements OnInit {

  model: CondicaoPagamento = new CondicaoPagamento();

  @ViewChild(ValidacaoListaComponent)
  private validacaoLista: ValidacaoListaComponent;

  lisCondicoesPagamento = [];
  constructor(
    private _condicaopagamentoService: CondicaoPagamentoService,    private _activeRoute: ActivatedRoute, private _router: Router) {}

    ngOnInit() {
  }

  onSubmit(condicaopagamentoForm: NgForm) {
    //alert('Clicou em salvar');
    /* if (condicaopagamentoForm.valid) {*/
    this._condicaopagamentoService.Salvar(this.model)
      .subscribe(
        (data) => {
          console.log('id:' + data);
          this._router.navigate(['/condicaopagamento/lista']);
          //alert('Deu certo');
        },
        (err: HttpErrorResponse) => {
          this.validacaoLista.ValidaDadosFormulario(err);
          HelperWindow.MoverParaCima();
        }
      );
    /*}*/
  }
  /**
   * Carrega a combobox com condicoes de pagamento
   */
  carregarCondicoesPagamento(): void {
    this._condicaopagamentoService.ListarCondicao().subscribe(data => {this.lisCondicoesPagamento = data;
    });
  }
}
