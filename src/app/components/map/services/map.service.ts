import { Injectable, HostListener, OnInit } from '@angular/core';

@Injectable()
export class MapService implements OnInit {

  map: L.Map;

  width: number;
  height: number;

  constructor() { }

  ngOnInit() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(e) {
    this.width = e.target.innerWidth;
    this.height = e.target.innerHeight;
  }

}
