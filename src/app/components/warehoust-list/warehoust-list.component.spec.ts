import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehoustListComponent } from './warehoust-list.component';

describe('WarehoustListComponent', () => {
  let component: WarehoustListComponent;
  let fixture: ComponentFixture<WarehoustListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehoustListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehoustListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
