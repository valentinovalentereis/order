import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteListaComponent } from '@app/cliente/cliente-lista';
import { ClienteComponent } from '@app/cliente/cliente/cliente.component';
import { ClienteEnderecoComponent } from '@app/cliente/cliente-endereco';
import { ClienteContatoComponent } from '@app/cliente/cliente-contato';


const routes: Routes = [
  { path: '', component: ClienteComponent },
  { path: 'lista', component: ClienteListaComponent },
  { path: ':id', component: ClienteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

export const routedComponents = [
  ClienteComponent,
  ClienteListaComponent,
  ClienteEnderecoComponent,
  ClienteContatoComponent,
];
