import { PedidoItem } from '@app/Order/shared/pedido-item';
import { PedidoEntrega } from '@app/Order/shared/pedido-entrega';
import { PedidoEvento } from '@app/Order/shared/pedido-evento';
import { Guid } from '@app/shared/guid';

export class Pedido {

    constructor(
        public guid: string = Guid.New().ToString(),
        public id: number = 0,
        public idEmpresa: number = 2,
        public idCliente: number = 0,
        public idCondPag: number = 1,
        public idNaturezaVenda: number = 1,
        public idEnderecoEntrega: number = 0,        
        public idUsuario: number = 1,
        public nomeComprador: string = '',        
        public obs: string = '',
        public nomeCliente: string = '',
        public dhEmissao: string = '',
        public idStatus: number = 0,
        public statusPedido: string = '',
        public status:boolean = false,
        public enderecoEntrega: PedidoEntrega[] = [],
        public Order: PedidoItem[] = [],
        public eventoPedido: PedidoEvento[] = []
        ) { }
}