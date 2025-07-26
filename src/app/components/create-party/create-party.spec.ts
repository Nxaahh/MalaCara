import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParty } from './create-party';

describe('CreateParty', () => {
  let component: CreateParty;
  let fixture: ComponentFixture<CreateParty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateParty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateParty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
