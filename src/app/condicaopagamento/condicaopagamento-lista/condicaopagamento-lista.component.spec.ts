import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicaoPagamentoListaComponent} from './condicaopagamento-lista.component';

describe('CondicaopagamentoListaComponent', () => {
  let component: CondicaoPagamentoListaComponent;
  let fixture: ComponentFixture<CondicaoPagamentoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicaoPagamentoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicaoPagamentoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
