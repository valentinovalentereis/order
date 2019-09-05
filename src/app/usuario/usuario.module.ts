import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '@app/usuario/shared/usuario.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [UsuarioService],
  exports: []
})
export class UsuarioModule { }
