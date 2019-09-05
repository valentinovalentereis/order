import { TestBed } from '@angular/core/testing';

import { NaturezaVendaService } from './naturezavenda.service';

describe('NaturezaVendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NaturezaVendaService = TestBed.get(NaturezaVendaService);
    expect(service).toBeTruthy();
  });
});
