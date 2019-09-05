import { Pipe, PipeTransform } from '@angular/core';
import { filterByField, Convert } from '@app/shared/convert';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any, field: string, value: any): any[] {
    console.log(items);
    if (!items) { return items; }

    const resultado = filterByField(field)(value, items);

    if (resultado !== undefined) {
      return resultado;
    }

  }
}
