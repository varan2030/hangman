import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenLettersComponent } from './hidden-letters.component';

describe('HiddenLettersComponent', () => {
  let component: HiddenLettersComponent;
  let fixture: ComponentFixture<HiddenLettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiddenLettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
