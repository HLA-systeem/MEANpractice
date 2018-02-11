import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCharacterformComponent } from './add-characterform.component';

describe('AddCharacterformComponent', () => {
  let component: AddCharacterformComponent;
  let fixture: ComponentFixture<AddCharacterformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCharacterformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCharacterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
