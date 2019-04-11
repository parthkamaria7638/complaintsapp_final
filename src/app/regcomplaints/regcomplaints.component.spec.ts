import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegcomplaintsComponent } from './regcomplaints.component';

describe('RegcomplaintsComponent', () => {
  let component: RegcomplaintsComponent;
  let fixture: ComponentFixture<RegcomplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegcomplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegcomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
