import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoticiaComponent } from './create-noticia.component';

describe('CreateNoticiaComponent', () => {
  let component: CreateNoticiaComponent;
  let fixture: ComponentFixture<CreateNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
