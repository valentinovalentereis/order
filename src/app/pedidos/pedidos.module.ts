import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';

import { OrderRoutingModule } from './Order-routing.module';
import { PedidoComponent } from '@app/Order/pedido';
import { ClienteService } from '@app/cliente/shared';
import { PedidoListaComponent } from '@app/Order/pedido-lista';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '@app/shared/shared.module';
import { Orderervice, PedidoItemService } from '@app/Order/shared';
import { NaturezaVendaService } from '@app/naturezavenda/shared/naturezavenda.service';
import { CondicaoPagamentoService } from '@app/condicaopagamento';
import { ProdutoService } from '@app/produtos/shared/produto.service';
import { PedidoItemComponent } from '@app/Order/pedido-item';

import { NgxCurrencyModule } from "ngx-currency";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ngx-currency/src/currency-mask.config";
import { PedidoEntregaComponent } from './pedido-entrega/pedido-entrega.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: true
};

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    SharedModule,
    OrderRoutingModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot()
  ],
 
  declarations: [PedidoComponent, PedidoListaComponent, PedidoItemComponent,  PedidoEntregaComponent],
  providers: [ClienteService, Orderervice, PedidoItemService, NaturezaVendaService, CondicaoPagamentoService, ProdutoService,NgxCurrencyModule,{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }], 
  
})
export class OrderModule { }
