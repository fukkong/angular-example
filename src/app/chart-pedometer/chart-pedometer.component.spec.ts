import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPedometerComponent } from './chart-pedometer.component';

describe('ChartPedometerComponent', () => {
  let component: ChartPedometerComponent;
  let fixture: ComponentFixture<ChartPedometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPedometerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPedometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
