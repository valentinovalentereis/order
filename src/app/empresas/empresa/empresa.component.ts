import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { HelperWindow } from '@app/shared/window';
import { ValidacaoListaComponent } from '@app/shared/validacao-lista';
import { Empresa, EmpresaService } from '../shared';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  isCollapsedDoc = true; /*Controla o Collapse da documentação*/
  model: Empresa = new Empresa();
  tpsEmpresa = [];
  erros = [];

  @ViewChild(ValidacaoListaComponent)
  private validacaoLista: ValidacaoListaComponent;

  constructor(private _empresaService: EmpresaService,
    private _activeRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  
    this._empresaService.ListarTpPessoas()
      .subscribe((data) => {
        this.tpsEmpresa = data;
        this.model.tpEmpresa = 1;
      });
      this.carregarParams();
  }

  carregarParams(): void {
    const id = this._activeRoute.snapshot.paramMap.get('id');

    if (id !== null && id !== undefined) {

      this.ListarEmpresaPorId(Number(id));
    }
  }
  ListarEmpresaPorId(id: number): void {
    this._empresaService.ListarEmpresaPorIdAsync(id)
      .then(empresa => {
        this.model = empresa;
      });
  }

  onSubmit(empresaForm: NgForm) {
    this._empresaService.Salvar(this.model)
      .subscribe(
        (data) => {
          console.log('id:' + data);
          this._router.navigate(['/empresa/lista']);
        },
        (err: HttpErrorResponse) => {
          
          this.validacaoLista.ValidaDadosFormulario(err);
          HelperWindow.MoverParaCima();
        }
      );
  }
}
