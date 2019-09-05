import { Guid } from '../../shared/guid';


export class EmpresaEndereco {

    constructor(
        public guid: string = Guid.New().ToString(),
        public id: number = 0,
        public tpEndereco: number = 1,
        public cep: string = '',
        public logradouro: string = '',
        public numero: string = '',
        public complemento: string = '',
        public bairro: string = '',
        public idCidade: number = 0,
        public idEstado: number = 0,
        public idPais: number = 0,
        public ptoReferencia: string = '',
        public excluido: Boolean = false
    ) { }
}
