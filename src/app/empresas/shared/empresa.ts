import { EmpresaEndereco } from './empresa.endereco';

export class Empresa {
    constructor(
        public id: number = 0,
        public razaoSocial: string = '',
        public fantasia: string = '',
        public tpEmpresa: number = 0,
        public documento: string = '',
        public ie: string = '',
        public im: string = '',
        public suframa: string = '',
        public enderecos: EmpresaEndereco[] = []
    ) { }
}
