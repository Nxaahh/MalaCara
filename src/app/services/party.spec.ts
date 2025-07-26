import { TestBed } from '@angular/core/testing';
import {Party} from '../models/fiesta';


describe('Party', () => {
  let service: Party;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Party);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
