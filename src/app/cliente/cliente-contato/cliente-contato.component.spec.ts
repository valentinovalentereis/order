import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteContatoComponent } from './cliente-contato.component';

describe('ClienteContatoComponent', () => {
  let component: ClienteContatoComponent;
  let fixture: ComponentFixture<ClienteContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteContatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
