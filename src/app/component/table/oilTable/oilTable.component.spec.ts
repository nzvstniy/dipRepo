/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OilTableComponent } from './oilTable.component';

describe('OilTableComponent', () => {
  let component: OilTableComponent;
  let fixture: ComponentFixture<OilTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
