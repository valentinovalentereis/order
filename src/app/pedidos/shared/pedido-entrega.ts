import { Guid } from '../../shared/guid';

export class PedidoEntrega  {

    constructor(
        //MODEL TABELA SQL
        //public guid: string = Guid.New().ToString(),
        public id: number = 0,
        public cep: string = '',
        public logradouro: string = '',
        public numero: string = '',
        public complemento: string = '',
        public bairro: string = '',
        public ptoReferencia: string = '',
        public idCidade: number = 0,
        public idEstado: number = 0,
        public idPais: number = 0,
        public excluido: Boolean = false

        /*ESTRUTURA NA BASE
        Id_Pedido
        CEP
        Logradouro
        Numero
        Complemento
        Bairro
        Id_Cidade
        Id_Estado
        Id_Pais
        */
    ) { }
}