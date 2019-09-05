import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NaturezaVendaComponent } from './naturezavenda';

const routes: Routes = [
  { path: '', component: NaturezaVendaComponent },
  { path: ':id', component: NaturezaVendaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NaturezaVendaRoutingModule { }