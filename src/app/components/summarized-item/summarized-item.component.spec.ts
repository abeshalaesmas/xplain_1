import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizedItemComponent } from './summarized-item.component';

describe('SummarizedItemComponent', () => {
  let component: SummarizedItemComponent;
  let fixture: ComponentFixture<SummarizedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummarizedItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarizedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
