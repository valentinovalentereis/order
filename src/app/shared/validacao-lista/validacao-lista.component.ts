import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Classe auxiliar para enviar mensagem de validação de formulário
 */
@Component({
  selector: 'app-validacao-lista',
  templateUrl: './validacao-lista.component.html',
  styleUrls: ['./validacao-lista.component.css']
})
export class ValidacaoListaComponent implements OnInit {

  constructor() { }
  /**
     * Retorna uma lista de erros gerados no método POST do formulário
     * @param err = erro gerado no formulário
     */
    erros: string[] = [];

    public ValidaDadosFormulario(err: HttpErrorResponse): string[] {
        this.erros = [];
        if (err.status === 400) {
            const validationErrorDictionary = err.error;
            for (const fieldName in validationErrorDictionary) {
              if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                for (let index = 0; index < validationErrorDictionary[fieldName].length; index++) {
                  const e = validationErrorDictionary[fieldName][index];
                  //console.log(e);
                  this.erros.push(e);
                }
                //console.log(this.erros);
              }
            }
          } else {
            this.erros.push('Ocorre um erro desconhecido!\n' + err.statusText);
          }
        return this.erros;
    }
  ngOnInit() {
  }
}
