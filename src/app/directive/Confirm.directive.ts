import { Directive, ElementRef, HostListener, Input,Output,EventEmitter } from '@angular/core';
import * as jQuery from 'jquery';
@Directive({
    selector: '[confirm]'
  }) 
  export class Confirm {
    @Output() confirm = new EventEmitter<any>();
    constructor(private el: ElementRef) {}
    @HostListener('click')
    onClick(){
        var options = {
            confirmButtonClass: 'green',
            cancelButtonClass: 'red-sunglo',
            closeAnimation: 'rotateYR',
            closeIcon: true,
            backgroundDismiss: true,
            icon: 'fa fa-exclamation-circle',
            animation: 'scale',
            animationClose: 'top',
            buttons: {
                confirm: () => this.confirm.emit(),
                cancel: () => {}
            }
        };
        // jQuery.confirm(options);
    }
 }