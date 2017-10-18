import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Overlays, Overlay } from './overlay.providers';

@Component({
  selector: 'overlays',
  templateUrl: './overlays.component.html',
  styleUrls: ['./overlays.component.scss']
})
export class OverlaysComponent implements OnInit {

  @Output() setOverlay = new EventEmitter();

  overlays: Array<any> = [];

  constructor() {
    this.overlays.push(Overlays.OWM_Precipitation);
    this.overlays.push(Overlays.NEXRAD);
    this.overlays.push(Overlays.MRMS);
    this.overlays.push(Overlays.Boundaries);
    this.overlays.push(Overlays.Labels);
  }

  ngOnInit() { }

}
