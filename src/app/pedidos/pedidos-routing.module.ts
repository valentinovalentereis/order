import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoListaComponent } from './pedido-lista';
import { PedidoComponent } from './pedido';
import { AuthorizationCheck } from '@app/shared/authentication/authorizationCheck';

const routes: Routes = [
  { path: '', component: PedidoComponent, canActivate: [AuthorizationCheck] },
  { path: 'lista', component: PedidoListaComponent , canActivate: [AuthorizationCheck] },
  { path: ':id', component: PedidoComponent, canActivate: [AuthorizationCheck] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
