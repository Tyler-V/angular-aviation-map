import { Injectable, HostListener, OnInit, EventEmitter } from '@angular/core';

@Injectable()
export class MapService implements OnInit {

  map: L.Map;
  width: number;
  height: number;
  isFullScreen: boolean;

  setLocationEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  @HostListener('window:resize', ['$event'])
  onResize(e) {
    this.width = e.target.innerWidth;
    this.height = e.target.innerHeight;
  }
}
