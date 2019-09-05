import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutoComponent } from '@app/produtos/produto';
import { ProdutoService } from '@app/produtos/shared';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    ProdutoComponent,
],
imports: [
    CommonModule,
    SharedModule,
    ProdutosRoutingModule
],
providers: [ProdutoService]  
})
export class ProdutosModule { }
