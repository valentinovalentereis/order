/**
 * Classe responsável por converter objetos
 */
export const findByField = (field) => (value, list) =>
list.find(obj => Convert.toAny(obj[field]) === Convert.toAny(value));

export const filterByField = (field) => (value, list) =>
list.filter(obj => obj.hasOwnProperty(field) ? obj[field] === Convert.toAny(value) : true);

export class Convert {
  constructor() {
  }

  /**
   * Convert para o tipo da variável
   * @param value Valor
   */
  static toAny(value: any): any {
    switch ((typeof value)) {
      case 'number':
        return Convert.toNumber(value);
      case 'string':
        return Convert.toString(value);
      case 'boolean':
        return Convert.toBoolean(value);
      default:
        return value;
    }
  }

  /**
   * Convert para string
   * @param value valor
   */
  static toString(value: any): string {
    if (!value) {
      return String(value);
    } else {
      return '';
    }
  }

  /**
   * Convert para number
   * @param value valor
   */
  static toNumber(value: any): number {
    if (!value) {
      return Number(value);
    } else {
      return 0;
    }
  }
  /**
   * Convert para booleano
   * @param value valor
   */
  static toBoolean(value: any): boolean {
    if (!value) {
      return Boolean(value);
    } else {
      return false;
    }
  }
}
