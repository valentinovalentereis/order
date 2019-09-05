import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '@app/shared/filter';
import { ModalComponent } from '@app/modal';
import { ValidacaoListaComponent } from '@app/shared/validacao-lista/';
import { PaginacaoComponent } from '@app/shared';
import { NgxMaskModule } from 'ngx-mask';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { DescribePipe } from '@app/shared/describe';
import { EnderecoComponent } from './endereco/endereco.component';
import { MensagemComponent } from '@app/mensagem';

const components = [
  FilterPipe,
  DescribePipe,
  ModalComponent,
  ValidacaoListaComponent,
  PaginacaoComponent,
  EnderecoComponent,
  MensagemComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  declarations: [components],
  exports: [components]
})
export class SharedModule { }
