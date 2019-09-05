import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalComponent, ModalTipo, ModalResposta } from '../../modal';

import { ClienteService, ClienteContato } from '../shared';

/**
 * @class ClienteContatoComponent Componente de Contato do Cliente.
 */
@Component({
  selector: 'app-cliente-contato',
  templateUrl: './cliente-contato.component.html',
  styleUrls: ['./cliente-contato.component.css']
})
export class ClienteContatoComponent implements OnInit, OnDestroy {
  @Input()
  public contatos: ClienteContato[];

  @Input()
  public contatosExcluidos: ClienteContato[];

  @ViewChild('contratoFrom')
  private contratoFrom: any;

  @ViewChild(ModalComponent)
  private msgBox: ModalComponent;

  public model = new ClienteContato();
  public tpTipoTelefones;

  constructor(private _clienteService: ClienteService) { }
  /**
   * Método acionado quando o component é iniciado
   */
  public ngOnInit() {
     this.contatosExcluidos = [];
    this.tpTipoTelefones = [];

    this.carregarTipo();
  }

  /**
   * Adicionar um contato na lista de contatos
   * @param contatoForm Formulário de Contato
   * @param model Entidade de Cliente Contato
   */

  adicionar(contatoForm: NgForm, model: ClienteContato): void {
    if (this.contatos == null) {
      this.contatos = [];
    }
    let index:number = -1;
    if (this.model.guid == null) {

      index = this.contatos.findIndex(m => m.id === model.id);
    } else {

      index = this.contatos.findIndex(m => m.guid === model.guid);
    }
    
    const novoContato = { ...model }; /*{ ... }Operador para clone de objeto*/

    if (index <= -1) {
      this.contatos.push(novoContato);
    } else {
      this.contatos[index] = novoContato;
    }
    contatoForm.reset();
    this.novo();
  }

    /**
   * Limpar a Model
   */
  novo() {
    this.model = new ClienteContato();
  }

  /**
   * Edita um cliente
   * @param model Entidade de clientes contatos
   */
  public editar(model: ClienteContato) {
    //this.model = model;
    this.model = { ...model };
  }

  /**
   * Remove uma entidade de cliente de contatos
   * @param model Entidade de Cliente Contato
   */
  remover(model: ClienteContato): void {  
    //this.msgBox.show('Deseja excluir?', 'Atenção', ModalTipo.SimNao);
    //this.msgBox.resposta.subscribe(resposta => {
      //if (resposta === ModalResposta.Sim) {
        const index = this.contatos.indexOf(model, 0);
        if (index > -1) {
          if (model.id > 0) {
            /*Quando o Id da model é diferente de Zero,
              preciso enviar para o Servidor excluir o registro. */
            this.contatos[index].excluido = true;
          } else {
            /*Quando o Id da model é igual a Zero,
              não preciso enviar para o Servidor excluir o registro, porque o registro ainda não existe. */
            this.contatos.splice(index, 1);
          }
          this.novo();
        }
      //}
    //});
  }

  /**
   * Retorna o nome do Tipo do telefone
   * @param id Identificador do telefone
   */
  public toTelefone(id: number): String {
    let nome: String = '';
    try {
      if (id !== null && id !== undefined) {
        const tipo: any = this.tpTipoTelefones.find(t => Number(t.id) === Number(id));
        if (tipo !== null && tipo !== undefined) {
          nome = tipo.nome;
        }
      }
    } catch (error) {
      console.error(error);
      this.msgBox.show(error, 'Error', ModalTipo.Ok);
    }

    return nome;

  }

  /**
   * Carregar tipo do contatos
   */
  private carregarTipo(): void {
    this._clienteService.ListarTpContatos()
      .subscribe((data) => {
        this.tpTipoTelefones = data;
      });
  }

  /**
  * Método acionado quando o component é destruído
  */
  public ngOnDestroy(): void {

  }
}
