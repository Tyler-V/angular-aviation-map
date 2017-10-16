import { Component, OnInit, ElementRef, ViewChild, EventEmitter, HostBinding } from '@angular/core';
import { MapService } from './map.service';
import { WeatherService } from './services/weather.service';
import { FaaService } from './services/faa.service';
import { SharedService } from '../../shared/shared.service';
import { Basemaps, Basemap } from './basemaps/basemap.providers';
import { Overlays, Overlay, OverlayType } from './overlays/overlay.providers';
import * as L from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapService, WeatherService, FaaService]
})
export class MapComponent implements OnInit {

  map: L.Map;
  basemap: L.Layer;
  overlays: Array<L.ImageOverlay | L.TileLayer> = [];
  sectionalLayer: L.Layer;
  radarLayer: L.Layer;
  previousZoom: number;
  maxBounds = L.latLngBounds(
    L.latLng(20, -130),
    L.latLng(50, -60)
  );

  constructor(public mapService: MapService, private elementRef: ElementRef, private weatherService: WeatherService, private faaService: FaaService, private shared: SharedService) { }

  ngOnInit() {
    this.map = this.mapService.map = new L.Map(this.elementRef.nativeElement, {
      zoomControl: false,
      maxBounds: this.maxBounds,
      minZoom: 5,
      maxZoom: 19
    });

    this.setBasemap(Basemaps.SectionalChart);

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
    // this.weatherService.getNEXRAD(image => {
    //   if (this.radarLayer) this.map.removeLayer(this.radarLayer);
    //   this.radarLayer = L.imageOverlay(image, this.map.getBounds(), { opacity: .5 }).bringToFront();
    //   this.map.addLayer(this.radarLayer);
    // });
    // this.weatherService.getMRMS(image => {
    //   if (this.radarLayer) this.map.removeLayer(this.radarLayer);
    //   this.radarLayer = L.imageOverlay(image, this.map.getBounds(), { opacity: .5 }).bringToFront();
    //   this.map.addLayer(this.radarLayer);
    // });
  }

  setBasemap(basemap: Basemap) {
    this.shared.showLoading();
    if (this.basemap) this.map.removeLayer(this.basemap);
    this.basemap = new L.TileLayer(basemap.url, basemap.options).addTo(this.map);
    if (this.mapService.openBasemaps) this.mapService.openBasemaps = false;
    if (basemap.options.maxZoom != undefined) this.map.setMaxZoom(basemap.options.maxZoom);
    this.shared.hideLoading();
  }

  setOverlay(overlay: Overlay) {
    switch (overlay.type) {
      case OverlayType.TileLayer:
        let layer = new L.TileLayer(overlay.url, overlay.options).bringToFront().addTo(this.map);
        break;
      case OverlayType.ImageOverlay:
        if (overlay.name.includes("MRMS")) {
          this.weatherService.getMRMS(image => {
            //if (this.radarLayer) this.map.removeLayer(this.radarLayer);
            let layer = L.imageOverlay(image, this.map.getBounds(), { opacity: .5 }).bringToFront().addTo(this.map);
            this.overlays.push(layer);
          });
        } else if (overlay.name.includes("NEXRAD")) {
          this.weatherService.getNEXRAD(image => {
            //if (this.radarLayer) this.map.removeLayer(this.radarLayer);
            let layer = L.imageOverlay(image, this.map.getBounds(), { opacity: .5 }).bringToFront().addTo(this.map);
            this.overlays.push(layer);
          });
        }
    }
    this.mapService.openOverlays = false;
  }
}
