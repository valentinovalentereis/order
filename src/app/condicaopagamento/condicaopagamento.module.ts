import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CondicaoPagamentoComponent } from '@app/condicaopagamento/condicaopagamento';
import { CondicaoPagamentoRoutingModule } from './condicaopagamento-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CondicaoPagamentoListaComponent } from '@app/condicaopagamento/condicaopagamento-lista';
import { CondicaoPagamentoService } from '@app/condicaopagamento/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CondicaoPagamentoRoutingModule
  ],
  declarations: [
    CondicaoPagamentoComponent,
    CondicaoPagamentoListaComponent
  ],
  providers: [CondicaoPagamentoService]
})
export class CondicaoPagamentoModule { }
