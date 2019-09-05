import { Guid } from '@app/shared/guid';

export interface IEndereco {
    guid: string;
    tpEndereco: number;
    descricao: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    idCidade: number;
    cidade: String;
    idEstado: number;
    estado: string;
    idPais: number;
    pais: string;
    excluido: boolean;
}

export class Endereco implements IEndereco {
    constructor(public guid: string = Guid.New().ToString(),
        public tpEndereco: number = 0,
        public descricao: string = '',
        public cep: string = '',
        public logradouro: string = '',
        public numero: string = '',
        public complemento: string = '',
        public bairro: string = '',
        public idCidade: number = 0,
        public cidade: String = '',
        public idEstado: number = 0,
        public estado: string  = '',
        public idPais: number = 0,
        public pais: string = '',
        public excluido: boolean = false) { }
}
