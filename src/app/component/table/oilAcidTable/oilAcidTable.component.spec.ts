/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OilAcidTableComponent } from './oilAcidTable.component';

describe('OilAcidTableComponent', () => {
  let component: OilAcidTableComponent;
  let fixture: ComponentFixture<OilAcidTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilAcidTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilAcidTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
