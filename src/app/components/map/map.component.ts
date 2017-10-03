import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MapService } from './services/map.service';
import { WeatherService } from './services/weather.service';
import { FaaService } from './services/faa.service';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import 'leaflet-providers';

@Component({
  selector: 'nexrad-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapService, WeatherService, FaaService]
})
export class MapComponent implements OnInit {

  map: L.Map;
  sectionalLayer: L.Layer;
  radarLayer: L.Layer;
  previousZoom: number;
  maxBounds = L.latLngBounds(
    L.latLng(20, -140),
    L.latLng(50, -50)
  );

  constructor(private elementRef: ElementRef, private weatherService: WeatherService, private mapService: MapService, private faaService: FaaService) { }

  ngOnInit() {
    this.mapService.map = this.map = new L.Map(this.elementRef.nativeElement, {
      attributionControl: false,
      zoomControl: false,
      //maxBounds: this.maxBounds,
      minZoom: 5,
      maxZoom: 19,
      //layers: [L.tileLayer.provider('Esri.WorldImagery')],
      doubleClickZoom: false
    });

    this.mapService.map.on("load", (e) => {
      this.setVFRSectional();
      this.setWeatherRadar();
    });

    this.mapService.map.setView([37.09024, -95.712891], 5);

    this.mapService.map.on("moveend", () => {
      this.setVFRSectional();
      this.setWeatherRadar();
    });
  }

  setVFRSectional() {
    this.faaService.getVFRSectional(image => {
      this.sectionalLayer = L.imageOverlay(image, this.map.getBounds()).addTo(this.map);
      this.setOverlayOrder();
    });
  }

  setWeatherRadar() {
    this.weatherService.getMRMS(image => {
      if (this.radarLayer) this.map.removeLayer(this.radarLayer);
      this.radarLayer = L.imageOverlay(image, this.map.getBounds(), { opacity: .5 }).addTo(this.map).bringToFront();
    });
  }

  setOverlayOrder() {
    if (this.radarLayer) {
      this.map.removeLayer(this.radarLayer);
      this.map.addLayer(this.radarLayer);
    }
  }
}
