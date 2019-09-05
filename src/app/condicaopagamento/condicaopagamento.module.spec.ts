import { CondicaoPagamentoModule } from './condicaopagamento.module';

describe('CondicaopagamentoModule', () => {
  let condicaoPagamentoModule: CondicaoPagamentoModule;

  beforeEach(() => {
    condicaoPagamentoModule = new CondicaoPagamentoModule();
  });

  it('should create an instance', () => {
    expect(CondicaoPagamentoModule).toBeTruthy();
  });
});
