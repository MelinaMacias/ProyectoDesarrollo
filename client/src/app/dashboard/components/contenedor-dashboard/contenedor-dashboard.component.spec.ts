import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorDashboardComponent } from './contenedor-dashboard.component';

describe('ContenedorDashboardComponent', () => {
  let component: ContenedorDashboardComponent;
  let fixture: ComponentFixture<ContenedorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
