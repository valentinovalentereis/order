import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresaEnderecoComponent } from '@app/empresas/empresa-endereco/empresa-endereco.component';

describe('EmpresaEnderecoComponent', () => {
  let component: EmpresaEnderecoComponent;
  let fixture: ComponentFixture<EmpresaEnderecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaEnderecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
