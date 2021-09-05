import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoticiaComponent } from './update-noticia.component';

describe('UpdateNoticiaComponent', () => {
  let component: UpdateNoticiaComponent;
  let fixture: ComponentFixture<UpdateNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
