import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcomplaintsComponent } from './allcomplaints.component';

describe('AllcomplaintsComponent', () => {
  let component: AllcomplaintsComponent;
  let fixture: ComponentFixture<AllcomplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcomplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
