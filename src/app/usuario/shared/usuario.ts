import { UsuarioConta } from '@app/usuario/shared';

export class Usuario {

  constructor(public id: number = 0,
    public administrador: boolean = false,
    public suspensa: boolean = false,
    public bloqueada: boolean = false,
    public dthUltimaAlteracao: Date = null,
    public dthUltimoAcesso: Date = null,
    public conta: UsuarioConta = new UsuarioConta()) { }
}
