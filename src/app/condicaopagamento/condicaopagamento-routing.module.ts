import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondicaoPagamentoComponent } from './condicaopagamento';
import { CondicaoPagamentoListaComponent } from './condicaopagamento-lista';

const routes: Routes = [
  { path: '', component: CondicaoPagamentoComponent },
  { path: 'lista', component: CondicaoPagamentoListaComponent },
  { path: ':id', component: CondicaoPagamentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondicaoPagamentoRoutingModule { }
