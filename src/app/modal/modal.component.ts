import { Component, OnInit, TemplateRef, Output, EventEmitter, ViewChild, Input, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalResposta, ModalTipo, ModalEvento, ModalIcone } from './modal.enum';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  @Input()
  mensagem: String = '';
  titulo: String = '';
  icone: String = '';
  evento: String = '';

  @Output()
  resposta: EventEmitter<ModalResposta> = new EventEmitter<ModalResposta>();

  labelYes: String = 'Sim';
  labelNo: String = 'Não';
  labelOk: String = 'Ok';

  @ViewChild('modal')
  private modal: TemplateRef<any>;

  private tipo: ModalTipo;

  constructor(private modalService: BsModalService) { }

  public ngOnInit() {

  }

  public ngOnDestroy(): void {
    this.resposta.unsubscribe();
  }

  public show(mensagem: String, titulo: String = '', tipoModal: ModalTipo = ModalTipo.Ok, evento: String = '', icone:String = ''): EventEmitter<ModalResposta> {

    this.titulo = titulo;
    this.mensagem = mensagem;
    this.tipo = tipoModal;

    this.evento = evento.toLowerCase();
    this.icone = icone.toLowerCase();

    this.modalRef = this.modalService.show(this.modal, { class: 'modal-md' });
    return this.resposta;
  }

  private yesOrOk(): void {
    try {
      if (this.tipo === ModalTipo.Ok) {
        this.resposta.emit(ModalResposta.Ok);
      } else {
        this.resposta.emit(ModalResposta.Sim);
      }
    } catch (error) {
      console.error(error);
    }

    this.modalRef.hide();
  }

  private no(): void {
    this.resposta.emit(ModalResposta.Nao);
    this.modalRef.hide();
  }

  private isSimNao(): Boolean {
    let retorno: Boolean = false;

    try {
      retorno = this.tipo === ModalTipo.SimNao;
    } catch (error) {
      retorno = false;
      console.error(error);
    }
    return retorno;
  }

  private isOk(): Boolean {
    let retorno: Boolean = false;

    try {
      retorno = this.tipo === ModalTipo.Ok;
    } catch (error) {
      retorno = false;
      console.error(error);
    }
    return retorno;
  }
}
