import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionCardComponent } from './adoption-card.component';

describe('AdoptionCardComponent', () => {
  let component: AdoptionCardComponent;
  let fixture: ComponentFixture<AdoptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
