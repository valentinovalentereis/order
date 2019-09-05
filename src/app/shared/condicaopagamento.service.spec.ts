import { TestBed } from '@angular/core/testing';

import { CondicaopagamentoService } from './condicaopagamento.service';

describe('CondicaopagamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CondicaopagamentoService = TestBed.get(CondicaopagamentoService);
    expect(service).toBeTruthy();
  });
});
