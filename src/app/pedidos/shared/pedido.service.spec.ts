import { TestBed } from '@angular/core/testing';

import { Orderervice } from './pedido.service';

describe('Orderervice', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Orderervice = TestBed.get(Orderervice);
    expect(service).toBeTruthy();
  });
});
