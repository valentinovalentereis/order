import { TestBed } from '@angular/core/testing';

import { EmpresaService } from './empresa.service';

describe('EmpresasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpresaService = TestBed.get(EmpresaService);
    expect(service).toBeTruthy();
  });
});
