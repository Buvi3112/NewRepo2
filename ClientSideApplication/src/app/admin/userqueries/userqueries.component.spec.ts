import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserqueriesComponent } from './userqueries.component';

describe('UserqueriesComponent', () => {
  let component: UserqueriesComponent;
  let fixture: ComponentFixture<UserqueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserqueriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserqueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
