import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    SharedModule
  ],
})
export class PedidoItemModule { }