/**
 * Classe responsável por Validar o CPF ou CNPJ
 */
export class ValidadorCpfCnpf {

    /**
     * Validar o CPF
     * @param cpf CPF (Pode ser passado com máscara)
     * @return Se o CPF é válido retorna um verdadeiro, caso contrário retorna falso.
     */
    public static validarCPF(cpf: string): boolean {
        if (cpf === null || cpf === '' || cpf === undefined) {
            return false;
        }
        const exp = /\.|\-/gi;
        cpf = cpf.toString().replace(exp, '');
        const digitoDigitado = Number(cpf.charAt(9) + Number(cpf.charAt(10)));
        let soma1 = 0, soma2 = 0;
        let vlr = 11;

        for (let i = 0; i < 9; i++) {
            soma1 += Number(cpf.charAt(i)) * (vlr - 1);

            soma2 += Number(cpf.charAt(i)) * vlr;
            vlr--;
        }
        soma1 = (((soma1 * 10) % 11) === 10 ? 0 : ((soma1 * 10) % 11));
        soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

        const digitoGerado = (soma1 * 10) + soma2;
        if (digitoGerado !== digitoDigitado) {
            return false;
        } else {
            return true;
        }

    }

    /**
    * Validar o CNPJ
    * @param cpf CPF (Pode ser passado com máscara)
    * @return Se o CPF é válido retorna um verdadeiro, caso contrário retorna falso.
    */
    public static validarCNPJ(cnpj): boolean {
        if (cnpj === null || cnpj === '' || cnpj === undefined) {
            return false;
        }

        const valida: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let dig1 = 0;
        let dig2 = 0;

        const exp = /\.|\-|\//gi;

        cnpj = cnpj.toString().replace(exp, '');

        const digito = Number(String(cnpj.charAt(12)).concat(cnpj.charAt(13)));

        for (let i = 0; i < valida.length; i++) {
            dig1 += (i > 0 ? (Number(cnpj.charAt(i - 1)) * valida[i]) : 0);
            dig2 += Number(cnpj.charAt(i)) * valida[i];
        }
        dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
        dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));

        if (((dig1 * 10) + dig2) !== digito) {
            return false;
        } else {
            return true;
        }
    }
}

