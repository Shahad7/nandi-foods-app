import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewUomComponent } from './create-new-uom.component';

describe('CreateNewUomComponent', () => {
  let component: CreateNewUomComponent;
  let fixture: ComponentFixture<CreateNewUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewUomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
