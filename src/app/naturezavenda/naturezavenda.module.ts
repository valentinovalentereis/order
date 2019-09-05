import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NaturezaVendaComponent } from '@app/naturezavenda/naturezavenda';
import { NaturezaVendaRoutingModule } from './naturezavenda-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { NaturezaVendaService } from '@app/naturezavenda/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NaturezaVendaRoutingModule
  ],
  declarations: [
    NaturezaVendaComponent
  ],
  providers: [NaturezaVendaService]
})
export class NaturezavendaModule { }
