import { Guid } from '../../shared/guid';

export class PedidoEvento{

    constructor(
        public guid: string = Guid.New().ToString(),
        public id: number = 0,
        public idUsuario: number = 1,
        public idEvento: number = 1
    ) { }
}
