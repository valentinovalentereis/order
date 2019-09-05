import { Directive, Input, ElementRef, OnChanges, SimpleChanges, forwardRef, AfterViewChecked } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { ValidadorCpfCnpf } from '../shared/ValidadorCpfCnpf';

@Directive({
  selector: '[appCpf], [cpf],[cpf][ngModel]',
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CpfDirective)
    }
  ]
})
export class CpfDirective implements Validator, OnChanges {
  @Input() cpf: string;

  constructor(private el: ElementRef) { }

  private onChange: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.onChange) {
      this.onChange();
    }
  }

  validate(c: AbstractControl): { [key: string]: any } {
    if (this.cpf !== '') {
      const cpf = ValidadorCpfCnpf.validarCPF(this.cpf);
      const valid = cpf ? null : { valid: false };
      return valid;
    }
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }

}
