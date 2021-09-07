import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeRespuestaComponent } from './mensaje-respuesta.component';

describe('MensajeRespuestaComponent', () => {
  let component: MensajeRespuestaComponent;
  let fixture: ComponentFixture<MensajeRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeRespuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
