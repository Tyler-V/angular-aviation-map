import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import 'leaflet-providers';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import { Providers, Basemap } from './providers';

@Component({
  selector: 'basemaps',
  templateUrl: './basemaps.component.html',
  styleUrls: ['./basemaps.component.scss']
})
export class BasemapsComponent implements OnInit {

  @Output() setBasemap = new EventEmitter();

  basemaps: Array<Basemap> = [];

  constructor() {
    this.basemaps.push(Providers.SectionalChart);
    this.basemaps.push(Providers.TerminalAreaChart);
    this.basemaps.push(Providers.HelicopterChart);
    this.basemaps.push(Providers.IFRAreaChart);
    this.basemaps.push(Providers.IFREnrouteHighChart);
    this.basemaps.push(Providers.IFREnrouteLowChart);

    this.basemaps.push(Providers.EsriWorldImageryMap);
    this.basemaps.push(Providers.EsriWorldStreetMap);
    this.basemaps.push(Providers.EsriWorldTopoMap);
    this.basemaps.push(Providers.OpenStreetMap);
    this.basemaps.push(Providers.OpenTopoMap);
    this.basemaps.push(Providers.OpenSurferMap);
  }

  ngOnInit() { }

}
