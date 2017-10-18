import { Injectable, HostListener, OnInit, EventEmitter } from '@angular/core';

@Injectable()
export class MapService implements OnInit {

  map: L.Map;
  width: number;
  height: number;

  setViewEvent: EventEmitter<number> = new EventEmitter(); 

  // Toolbar
  openBasemaps: boolean;
  openOverlays: boolean;
  fullscreen: boolean;

  location: boolean;
  locationMarker: L.Marker;
  setLocationEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  @HostListener('window:resize', ['$event'])
  onResize(e) {
    this.width = e.target.innerWidth;
    this.height = e.target.innerHeight;
  }
}
