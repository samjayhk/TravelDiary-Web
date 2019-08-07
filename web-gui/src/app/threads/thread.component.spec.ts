/**
 * PLEASE BE MIND THAT YOU COULD NOT COPY, MODIFY OR SHARE THIS PROJECT IF YOU ARE NOT GET PERMISSION.
 * @samjayhk
 */


import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ThreadComponent } from './thread.component';

describe('ThreadComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ThreadComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ThreadComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gui'`, () => {
    const fixture = TestBed.createComponent(ThreadComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('gui');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(ThreadComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to gui!');
  });
});
