import { ClienteContato, ClienteEndereco } from '../shared';
import { ValidadorCpfCnpf } from '@app/shared/cnpjcpf/shared';
import { Guid } from '@app/shared';

export class Cliente {
  constructor(
    /*public guid: string = Guid.New().ToString(),*/
    public idCliente: number = 0,
    public tpPessoa: number = 0,
    public razaoSocial: string = '',
    public fantasia: string = '',
    public obs: string = '',
    public cpf: string = '',
    public rg: string = '',
    public indIe: number = 0,
    public cnpj: string = '',
    public suframa: string = '',
    public ie: string = '',
    public im: string = '',
    public optanteSn: number = 0,
    public inativo: boolean = false,
    public idEmpresa: number = 2,
    public contatos: ClienteContato[] = [],
    public enderecos: ClienteEndereco[] = []) { }



  public get isValiadoCPF(): boolean {
    return ValidadorCpfCnpf.validarCPF(this.cpf);
  }

  public get disabled(): boolean {
      return this.inativo;
  }

}
