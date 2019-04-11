import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstatusComponent } from './userstatus.component';

describe('UserstatusComponent', () => {
  let component: UserstatusComponent;
  let fixture: ComponentFixture<UserstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
