import { Guid } from '../../shared/guid';

export class ClienteContato {
    constructor(
        public guid: string = Guid.New().ToString(),
        public id: number = 0,
        public descricao: string = '',
        public departamento: string = '',
        public email: string = '',
        public tpTelefone: number = 1,
        public ddd: string = '',
        public ramal: string = '',
        public telefone: string = '',
        public excluido: Boolean = false)
    { }
}