import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mensagem, MensagemType } from './mensagem';
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class MensagemService{

    mensagemSubject: Subject<Mensagem> = new Subject<Mensagem>();
    keepAfterRouteChange = false;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                if(this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }

            }
        });
    }
    success(mensagem: string, keepAfterRouteChange: boolean = false) {
        this.mensagem(MensagemType.SUCCESS, mensagem,keepAfterRouteChange);
    }
    warning(mensagem: string, keepAfterRouteChange: boolean = false) {
        this.mensagem(MensagemType.WARNING,mensagem,keepAfterRouteChange);
    }
    danger(mensagem: string, keepAfterRouteChange: boolean = false) {
        this.mensagem(MensagemType.DANGER, mensagem,keepAfterRouteChange);
    }
    info(mensagem: string, keepAfterRouteChange: boolean = false) {
        this.mensagem(MensagemType.INFO, mensagem,keepAfterRouteChange);
    }

    private mensagem(mensagemType: MensagemType, mensagem: string, keepAfterRouteChange: boolean = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.mensagemSubject.next(new Mensagem(mensagemType, mensagem));
    }

    getMensagem(){
        return this.mensagemSubject.asObservable();
    }
    clear() {
        this.mensagemSubject.next(null);
    }
}