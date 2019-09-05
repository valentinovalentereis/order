/**
 * Classe auxiliar para funções window
 */
export class HelperWindow {

    /**
     * Posiciona a pagina conforme os parametros
     * @param esquerda - Posição a esquerda
     * @param topo  - Posição a direita
     * @param animacao - Animação do Scroll
     */
    static MoverParaCima(esquerda: number = 0, topo: number = 0, animacao: ScrollBehavior = 'smooth') {
        const options: ScrollToOptions = { left: esquerda, top: topo, behavior: animacao };
        window.scrollTo(options);
    }

}
