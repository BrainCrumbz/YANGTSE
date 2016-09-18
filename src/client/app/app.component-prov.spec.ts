import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from '../app/app.component';

describe('AppComponent as provider', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      providers: [
        AppComponent
      ],
    });

  });

  it('should complete beforeEach', () => expect(true).toBe(true));

  it('should set title', inject([
    AppComponent
  ], (component: AppComponent) => {

    // confirm component property, without testing binding
    expect(component.title).toBe('Tour of Heroes');
  }));

  // TODO: cannot instantiate component and access corresponding DOM

});
