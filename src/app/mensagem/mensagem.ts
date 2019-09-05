export class Mensagem {

    constructor(
         public readonly mensagemType: MensagemType,
         public readonly mensagem: string
         ) {}
}

export enum MensagemType {

    SUCCESS,
    WARNING,
    DANGER,
    INFO
}
