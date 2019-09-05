import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturezaVendaComponent} from './naturezavenda.component';

describe('NaturezavendaComponent', () => {
  let component: NaturezaVendaComponent;
  let fixture: ComponentFixture<NaturezaVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaturezaVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturezaVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
