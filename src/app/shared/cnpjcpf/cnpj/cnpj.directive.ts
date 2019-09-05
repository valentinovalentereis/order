import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
import { ValidadorCpfCnpf } from '../shared/';

@Directive({
  selector: '[appCnpj], [cnpj], [cnpj],[cnpj][ngModel]'
})
export class CnpjDirective implements Validator, OnChanges {
  @Input() cnpj: string;

  constructor() { }

  private onChange: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.onChange) {
      this.onChange();
    }
  }

  validate(c: AbstractControl): { [key: string]: any } {
    if (this.cnpj) {
      const cnpj = ValidadorCpfCnpf.validarCNPJ(this.cnpj);
      const valid = cnpj ? null : { valido: true };
      return valid;
    }
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }

}
