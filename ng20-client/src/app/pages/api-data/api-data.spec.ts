import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiData } from './api-data';

describe('ApiData', () => {
  let component: ApiData;
  let fixture: ComponentFixture<ApiData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
