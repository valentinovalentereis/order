import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';

import { ClienteRoutingModule, routedComponents } from './cliente-routing.module';
import { ClienteService } from '@app/cliente/shared';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CnpjCpfModule } from '@app/shared/cnpjcpf';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    PaginationModule.forRoot(),
    CnpjCpfModule,
    SharedModule,
    ClienteRoutingModule
  ],
  declarations: [routedComponents
  ],
  providers: [ClienteService],
  exports: []
})
export class ClienteModule { }
