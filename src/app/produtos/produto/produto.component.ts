import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto, ProdutoService } from '../shared';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperWindow } from '@app/shared/window';
import { ValidacaoListaComponent } from '@app/shared/validacao-lista';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  model: Produto = new Produto();
  LisProduto = [];
  erros = [];

  constructor(private _produtoService: ProdutoService,
    private _activeRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {

    this.carregarParams();    
  }
  carregarParams(): void {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    /*console.log('Params rota id: ' + id);*/
    if (id !== null && id !== undefined) {

      this.ListarProdutoPorId(Number(id));
    }
  }
  ListarProdutoPorId(id: number): void {
    this._produtoService.ListarProdutoPorIdAsync(id)
      .then(produto => {
        this.model = produto;
      });
  }
}
