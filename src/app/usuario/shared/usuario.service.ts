import { Injectable } from '@angular/core';
import { Usuario } from '@app/usuario/shared/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  /**
   * usuarioLogado
 : Usuario  */
  public usuarioLogado(): Usuario {
    return new Usuario(0, false, false, false);
  }
}
