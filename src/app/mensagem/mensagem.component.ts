import { Component, Input } from '@angular/core';
import { MensagemService } from './mensagem.service';
import { Mensagem, MensagemType } from './mensagem';

@Component({
    selector: 'ap-mensagem',
    templateUrl: './mensagem.component.html'
})
export class MensagemComponent {

    @Input() timeout = 3000;
    mensagens: Mensagem[] = [];
    iconeMensagem: string;
    currentStyles = {     
        'color':      'red',     
        'font-size':   '22px'
    };
    constructor(private MensagemService: MensagemService) {
        this.MensagemService
        .getMensagem()
        .subscribe(mensagem => {
            if(!mensagem) {
                this.mensagens = [];
                return;
            }
            this.mensagens.push(mensagem);
            setTimeout(() => this.removeMensagem(mensagem), this.timeout);
        })
    }
    removeMensagem(mensagemToRemove: Mensagem) {
        this.mensagens = this.mensagens.filter(mensagem => mensagem != mensagemToRemove)
    }

    getMensagemClass(mensagem:Mensagem) {
        if(!mensagem) return '';
        switch (mensagem.mensagemType) {
            case MensagemType.DANGER:
                this.iconeMensagem = 'fa fa-exclamation-circle fa-2x';
                this.currentStyles.color = 'red';
                return 'alert alert-danger';
            case MensagemType.INFO:
                this.iconeMensagem = 'fa fa-info-circle fa-2x';
                this.currentStyles.color = 'blue';
                return 'alert alert-primary';
            case MensagemType.SUCCESS:
                this.iconeMensagem = 'fa fa-check-circle fa-2x';
                this.currentStyles.color = 'green';
                return 'alert alert-success';
            case MensagemType.WARNING:
                this.iconeMensagem = 'fa fa-warning fa-2x';
                this.currentStyles.color = 'orange';
                return 'alert alert-warning'
        }
    }
}