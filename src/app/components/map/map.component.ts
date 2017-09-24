import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NexradService } from './services/nexrad.service';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import * as $ from "jquery";
import 'leaflet-providers';

@Component({
  selector: 'nexrad-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [NexradService]
})
export class MapComponent implements OnInit {

  radarLayer: L.Layer;

  radarUrl: any;

  map: L.Map;
  maxBounds = L.latLngBounds(
    L.latLng(20, -140),
    L.latLng(50, -50)
  );

  constructor(private _elementRef: ElementRef, private _nexradService: NexradService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.map = new L.Map(this._elementRef.nativeElement, {
      attributionControl: false,
      zoomControl: false,
      //maxBounds: this.maxBounds,
      minZoom: 5,
      maxZoom: 19,
      layers: [L.tileLayer.provider('Esri.WorldStreetMap')]
    }).setView([37.09024, -95.712891], 5);

    window.navigator.geolocation.getCurrentPosition(location => {
      let latLng = new L.LatLng(location.coords.latitude, location.coords.longitude);
      this.map.flyTo(latLng, 6, {
        duration: 3,
        noMoveStart: true
      });
    }, (error) => {

    },
      {
        enableHighAccuracy: true
      }
    );

    this.map.on("zoomend, moveend", () => {
      this._nexradService.getRadarImage(950, 1920, this.map.getBounds(), null, b64 => {
        if (this.radarLayer) this.map.removeLayer(this.radarLayer);
        this.radarLayer = L.imageOverlay(b64, this.map.getBounds()).addTo(this.map);
      })
    })
  }
}
