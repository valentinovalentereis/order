import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoEntregaComponent } from './pedido-entrega.component';

describe('PedidoEntregaComponent', () => {
  let component: PedidoEntregaComponent;
  let fixture: ComponentFixture<PedidoEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
