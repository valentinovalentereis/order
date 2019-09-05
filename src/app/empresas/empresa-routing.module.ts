import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaListaComponent } from './empresa-lista';
import { EmpresaComponent } from './empresa';

const routes: Routes = [
  { path: '', component: EmpresaComponent },
  { path: 'lista', component: EmpresaListaComponent },
  { path: ':id', component: EmpresaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
