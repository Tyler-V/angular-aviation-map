import { Component, OnInit, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { MapService } from './services/map.service';
import { WeatherService } from './services/weather.service';
import { FaaService } from './services/faa.service';
import { SharedService } from '../../shared/shared.service';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import 'leaflet-providers';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapService, WeatherService, FaaService]
})
export class MapComponent implements OnInit {

  map: L.Map;
  basemap: L.Layer;
  sectionalLayer: L.Layer;
  radarLayer: L.Layer;
  previousZoom: number;
  maxBounds = L.latLngBounds(
    L.latLng(20, -130),
    L.latLng(50, -60)
  );

  constructor(private elementRef: ElementRef, private weatherService: WeatherService, private mapService: MapService, private faaService: FaaService, private shared: SharedService) { }

  ngOnInit() {
    this.map = this.mapService.map = new L.Map(this.elementRef.nativeElement, {
      attributionControl: false,
      zoomControl: false,
      maxBounds: this.maxBounds,
      minZoom: 5,
      maxZoom: 19
    });

    this.setBasemap(
      new L.TileLayer('https://wms.chartbundle.com/tms/1.0.0/sec/{z}/{x}/{-y}.png', {
        updateWhenIdle: false
      })
    );

    this.map.on("load", (e) => {
      //this.mapService.setLocationEvent.emit();
      this.setWeatherRadar();
    });

    this.map.on("moveend", (e) => {
      this.setWeatherRadar();
    });

    this.map.on("zoomstart", () => {
      if (this.radarLayer) this.map.removeLayer(this.radarLayer);
    });

    this.map.setView([37.09024, -95.712891], 5);
  }

  setWeatherRadar() {
    //this.shared.showLoading();
    this.weatherService.getMRMS(image => {
      if (this.radarLayer) this.map.removeLayer(this.radarLayer);
      this.radarLayer = L.imageOverlay(image, this.map.getBounds(), { opacity: .5 }).bringToFront();
      this.map.addLayer(this.radarLayer);
      //this.shared.hideLoading();
    });
  }

  setBasemap(basemap: L.TileLayer) {
    if (this.basemap) this.map.removeLayer(this.basemap);
    this.map.addLayer(basemap);
  }
}
