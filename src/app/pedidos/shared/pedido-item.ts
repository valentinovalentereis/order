import { Guid } from '../../shared/guid';

export class PedidoItem {

    constructor(
        //MODEL TABELA SQL
        public guid: string = Guid.New().ToString(),
        public id: number = 0,
        public idProduto: number = 0,
        public descricao: string = '',
        public qtde: number = null,
        public valorUnitario: number = 0,
        public valorDesconto: number = 0,
        public observacao: string = '',
        public excluido: boolean = false,
        
        //CONTROLE INTERNO
        public IdControle: number = 0,
        public ValorItem: number = 0,
        public PercDesconto: number = null,
        public UnidMedida: string = ''

        /*ESTRUTURA NA BASE
        Id_Pedido
        Item
        Id_Produto
        Descricao
        Qtde
        ValorUnitario
        ValorDesconto
        Observacao  
        */
    ) { }
}