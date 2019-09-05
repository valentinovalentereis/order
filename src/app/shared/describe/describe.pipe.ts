import { Pipe, PipeTransform } from '@angular/core';
import { findByField } from '@app/shared/convert';

@Pipe({
  name: 'describe',
  pure: false
})
export class DescribePipe implements PipeTransform {

  /**
   *
   * @param filter Filtro
   * @param array Lista de Opções
   * @param fieldFilter Campo de Filtro
   * @param fieldDisplay Campo de Exibição
   */
  transform(filter: any, array: any, fieldFilter: any, fieldDisplay: any): any {

    if (!filter) {
      return filter;
    }

    if (!array) {
      return '';
    }

    const resultado = findByField(fieldFilter)(filter, array);

    if (resultado !== undefined) {
      return resultado[fieldDisplay];
    }
  }
}
