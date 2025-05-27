import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenorFormComponent } from './menor-form.component';

describe('MenorFormComponent', () => {
  let component: MenorFormComponent;
  let fixture: ComponentFixture<MenorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
