export enum ModalResposta {
    Nenhum = 0,
    Ok = 1,
    Sim = 2,
    Nao = 3,
    Fechar = 4
}

export enum ModalTipo {
    Ok = 0,
    SimNao = 1
}
export enum ModalEvento {
    atencao = 'modal-header bg-warning',
    informacao = 'modal-header bg-primary',
    perigo = 'modal-header bg-danger',
    sucesso = 'modal-header bg-success'
}

export enum ModalIcone {
    exclamacao = 'fa fa-exclamation-circle pull-left',
    informacao = 'fa fa-info-circle pull-left',
    pergunta = 'fa fa-question-circle pull-left'
}