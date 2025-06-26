import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookForms } from './book-form.components';

describe('BookForms', () => {
  let component: BookForms;
  let fixture: ComponentFixture<BookForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
