import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyaccountComponent } from './modifyaccount.component';

describe('ModifyaccountComponent', () => {
  let component: ModifyaccountComponent;
  let fixture: ComponentFixture<ModifyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
