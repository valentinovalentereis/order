import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CnpjDirective, CnpjComponent } from './cnpj';
import { CpfDirective, CpfComponent } from './cpf';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    CnpjDirective, CpfDirective,
    CpfComponent, CnpjComponent
  ],
  exports: [
    CnpjDirective, CpfDirective,
    CpfComponent, CnpjComponent
  ]
})
export class CnpjCpfModule { }
