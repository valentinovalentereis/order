import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacaoListaComponent } from './validacao-lista.component';

describe('ValidacaoListaComponent', () => {
  let component: ValidacaoListaComponent;
  let fixture: ComponentFixture<ValidacaoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacaoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
