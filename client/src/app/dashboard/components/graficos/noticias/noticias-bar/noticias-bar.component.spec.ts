import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasBarComponent } from './noticias-bar.component';

describe('NoticiasBarComponent', () => {
  let component: NoticiasBarComponent;
  let fixture: ComponentFixture<NoticiasBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
