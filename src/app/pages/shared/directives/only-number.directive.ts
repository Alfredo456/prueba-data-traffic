import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[OnlyNumber]'
})
export class OnlyNumber {
    public number: RegExp = new RegExp('^[0-9]{1,2}$');
    public firtsTime = true;

    constructor(private _el: ElementRef, private renderer: Renderer) { }

    @Input() OnlyNumber: boolean;

    @HostListener('input', ['$event']) oninput(event) {
        let e = event;
        let initialText = this._el.nativeElement.value.slice(0, -1);
        let newCharacter = this._el.nativeElement.value.slice(-1);
        if (this.OnlyNumber) {
            if (this.firtsTime) {
                if (!this.number.test(newCharacter)) {
                    this.firtsTime = false;
                    this._el.nativeElement.value = initialText.trim() ? initialText : null;
                    let event: Event = document.createEvent("Event");
                    event.initEvent('input', true, true);
                    Object.defineProperty(event, 'target', { value: this._el.nativeElement, enumerable: true });
                    this.renderer.invokeElementMethod(this._el.nativeElement, 'dispatchEvent', [event]);
                }
            } else {
                this.firtsTime = true;
            }
        }
    }
}
