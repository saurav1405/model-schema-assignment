import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSchemaComponent } from './print-schema.component';

describe('PrintSchemaComponent', () => {
  let component: PrintSchemaComponent;
  let fixture: ComponentFixture<PrintSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
