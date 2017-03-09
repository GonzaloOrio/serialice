import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieShowComponent } from './serie-show.component';

describe('SerieShowComponent', () => {
  let component: SerieShowComponent;
  let fixture: ComponentFixture<SerieShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
