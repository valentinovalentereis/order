export class Produto {
    constructor(
        public idProduto: number = 0,
        public idEmpresa: number = 0,
        public descricao: string = '',
        public idUnidMed: number = 0,
        public unidMedida: string = '',
        public descricaoUnidMed: string = '',
        public formatoUnidMed: string = '',
        public decimalUnidMed: number = 0,
        public valorUnitario: number = 0,
        public descontoMaximo: number = 0
    ) { }
}