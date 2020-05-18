import { OcticonDirective } from './octicon.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('OcticonDirective', () => {
  it('should create an instance', () => {
    const directive = new OcticonDirective(null, null);
    expect(directive).toBeTruthy();
  });
});
