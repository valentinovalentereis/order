import { Component, Input, AfterContentChecked, forwardRef, OnChanges, ViewChild, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, FormControl, NgModel, AbstractControl } from '@angular/forms';
import { ValidadorCpfCnpf } from '@app/shared/cnpjcpf/shared';
import { ValueAccessorBase } from '@app/shared/value-accessor';

@Component({
  selector: 'app-cpf, input-cpf',
  templateUrl: './cpf.component.html',
  styleUrls: ['./cpf.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CpfComponent),
    multi: true
  },
  {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CpfComponent)
  }]
})
export class CpfComponent extends ValueAccessorBase<String> implements OnInit  {

  @ViewChild(NgModel) modelCpf: NgModel;

  /**
   * Indica se o campo é obrigatório
   */
  @Input()
  campoObrigatorio: Boolean = false;

  ngOnInit() {
    this.onWriteValue = this.onWriteValue2;
  }

  onWriteValue2(novoValor: string) {
    this.value = novoValor;
    console.log('onWriteValue');
  }

  handleInput(value) {
    if (!this.value) {
      this.value = null;
    }
    this.value = value;
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const valid = this.modelCpf.valid ? null : { valid: false };
    return valid;
  }
}


