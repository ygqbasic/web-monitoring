
import {fromEvent as observableFromEvent,  Observable } from 'rxjs';

import {debounceTime} from 'rxjs/operators';

import { Component, OnInit, ViewChildren, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-js-error',
  templateUrl: './js-error.component.html',
  styleUrls: ['./js-error.component.scss']
})
export class JsErrorComponent implements OnInit {
  @ViewChildren('mydetailsContent') mydetailsContent:Array<ElementRef>
  unsubscribe = {
    sub0: null
  }
  constructor(
    private render:Renderer2
  ) { }

  ngOnInit() {
    this.unsubscribe.sub0=observableFromEvent(window, "resize").pipe(
    debounceTime(100))
    .subscribe((event) => {
      this._resizePageHeight();
    });
  }

  ngAfterViewInit() {
    this._resizePageHeight();
  }
  ngOnDestroy(): void {
    this.unsubscribe.sub0.unsubscribe();
  }
 
  private _resizePageHeight() {
    this.mydetailsContent.forEach(element => {
      this.render.setStyle(element.nativeElement, "height", window.innerHeight - 50 - 70 + "px");
    });
  
  }

}


