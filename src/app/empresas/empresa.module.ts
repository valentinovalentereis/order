import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmpresaComponent } from '@app/empresas/empresa';
import { EmpresaListaComponent } from '@app/empresas/empresa-lista';
import { EmpresaService} from '@app/empresas/shared';
import { EmpresaRoutingModule } from '@app/empresas/empresa-routing.module';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { EmpresaEnderecoComponent } from '@app/empresas/empresa-endereco';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    declarations: [
        EmpresaComponent,
        EmpresaEnderecoComponent,
        EmpresaListaComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CollapseModule.forRoot(),
        NgxMaskModule.forRoot(),
        SharedModule,
        EmpresaRoutingModule
    ],
    providers: [EmpresaService]
})

export class EmpresaModule { }
