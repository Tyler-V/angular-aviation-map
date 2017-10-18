import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { Basemaps, Basemap } from './basemap.providers';

@Component({
  selector: 'basemaps',
  templateUrl: './basemaps.component.html',
  styleUrls: ['./basemaps.component.scss']
})
export class BasemapsComponent implements OnInit {

  @Output() setBasemap = new EventEmitter();

  basemaps: Array<Basemap> = [];

  constructor() {
    this.basemaps.push(Basemaps.SectionalChart);
    this.basemaps.push(Basemaps.TerminalAreaChart);
    this.basemaps.push(Basemaps.HelicopterChart);
    this.basemaps.push(Basemaps.IFRAreaChart);
    this.basemaps.push(Basemaps.IFREnrouteHighChart);
    this.basemaps.push(Basemaps.IFREnrouteLowChart);

    this.basemaps.push(Basemaps.EsriWorldImageryMap);
    this.basemaps.push(Basemaps.EsriWorldStreetMap);
    this.basemaps.push(Basemaps.EsriWorldTopoMap);
    this.basemaps.push(Basemaps.OpenStreetMap);
    this.basemaps.push(Basemaps.OpenTopoMap);
    this.basemaps.push(Basemaps.OpenSurferMap);
    this.basemaps.push(Basemaps.NasaEarthAtNight);
    this.basemaps.push(Basemaps.EsriWorldGrayCanvas);
    this.basemaps.push(Basemaps.EsriNatGeoWorldMap);
  }

  ngOnInit() { }

}
