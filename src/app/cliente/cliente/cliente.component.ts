import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClienteContatoComponent } from '../cliente-contato';
import { ClienteEnderecoComponent } from '../cliente-endereco';
import { Cliente, ClienteService } from '../shared';
import { ModalComponent } from '@app/modal';
import { environment } from '@env/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperWindow } from '@app/shared/window';
import { ValidacaoListaComponent } from '@app/shared/validacao-lista';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit, OnDestroy {

  @ViewChild(ClienteContatoComponent)
  private contatosComponent: ClienteContatoComponent;

  @ViewChild(ClienteEnderecoComponent)
  private enderecosComponent: ClienteEnderecoComponent;

  @ViewChild(ModalComponent)
  private msgBox: ModalComponent;

  @ViewChild('clienteForm') _clienteForm: NgForm;

  tpPessoaHabilitado = true;
  model = new Cliente();

  tpPessoas = [];
  listaIndIE = [];
  listaOptanteSN = [];
  erros = [];

  @ViewChild(ValidacaoListaComponent)
  private validacaoLista: ValidacaoListaComponent;

  debug: boolean = !environment.production;

  constructor(private _clienteService: ClienteService,
    private _activeRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._clienteService.ListarTpPessoas()
      .subscribe((data) => {
        this.tpPessoas = data;
        this.model.tpPessoa = 1;
      });

    this._clienteService.ListaIndIE()
      .subscribe((data) => {
        this.listaIndIE = data;
      });

    this._clienteService.ListaOptanteSN()
      .subscribe((data) => {
        this.listaOptanteSN = data;
      });

    this.carregarParams();
  }

  carregarParams(): void {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {

      this.ListarClientePorId(Number(id));
    }

  }

  onSubmit(clienteForm: NgForm) {
    this._clienteService.Salvar(this.model)
      .subscribe(
        (data) => {
          console.log('id:' + data);
          this._router.navigate(['/cliente/lista']);
        },
        (err: HttpErrorResponse) => {
          
          this.validacaoLista.ValidaDadosFormulario(err);
          HelperWindow.MoverParaCima();
        }
      );
  }
  
/*
  onSubmit(clienteForm: NgForm) {
    console.log(this.model);
    //if (clienteForm.valid) {
      this._clienteService.Salvar(this.model)
        .subscribe(
          (data) => {
            console.log('id:' + data);
            this._router.navigate(['/cliente/lista']);
          },
          (err) => {
                if (err.status === 400) {
                  // handle validation error
                  const validationErrorDictionary = JSON.parse(err.text());
                  for (const fieldName in validationErrorDictionary) {
                      if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                          this.erros.push(validationErrorDictionary[fieldName]);
                      }
                  }
              } else {
                  this.erros.push('Ocorre um erro desconhecido!\n' + err.text());
              }

            }
        );

        */
      /*      
      console.log(this.model);
      console.log(this.contatosComponent.contatos);
      console.log(this.contatosComponent.contatosExcluidos);
      console.log(this.enderecosComponent.enderecos);
      console.log(this.enderecosComponent.enderecosExcluidos);
      */
    //}
  //}

  ListarClientePorId(id: number): void {
    this._clienteService.ListarClientePorIdAsync(id)
      .then(cliente => {
        this.model = cliente;
        this.tpPessoaHabilitado = false;
      });
  }
  ngOnDestroy(): void {
  }

  pesssoaModelChange($event) {
    console.log('pesssoaModelChange' + $event.target.value);
   /* const tpPessoa = this.model.tpPessoa;

    this.model = new Cliente();
    this._clienteForm.reset();
    this.model.tpPessoa = tpPessoa;*/
  }
}
