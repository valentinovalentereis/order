import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { ValueAccessorBase } from '@app/shared/value-accessor';

@Component({
  selector: 'app-cnpj, input-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CnpjComponent),
    multi: true
  },
  {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CnpjComponent)
  }]
})
export class CnpjComponent extends ValueAccessorBase<String> {

  @ViewChild(NgModel) modelCnpj: NgModel;

  /**
   * Indica se o campo é obrigatório
   */
  @Input()
  campoObrigatorio: Boolean = false;


  handleInput(value) {
    if (!this.value) {
      this.value = null;
    }
    this.value = value;
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const valid = this.modelCnpj.valid ? null : { valid: false };
    return valid;
  }
}
