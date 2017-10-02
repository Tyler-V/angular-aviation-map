import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MapService } from './services/map.service';
import { NexradService } from './services/nexrad.service';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import 'leaflet-providers';

@Component({
  selector: 'nexrad-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapService, NexradService]
})
export class MapComponent implements OnInit {

  radarBounds: L.LatLngBounds;
  radarLayer: L.Layer;
  radarUrl: any;

  previousZoom: number;
  maxBounds = L.latLngBounds(
    L.latLng(20, -140),
    L.latLng(50, -50)
  );

  constructor(private elementRef: ElementRef, private nexradService: NexradService, private mapService: MapService) {   }

  ngOnInit() {
    this.mapService.map = new L.Map(this.elementRef.nativeElement, {
      attributionControl: false,
      zoomControl: false,
      //maxBounds: this.maxBounds,
      minZoom: 5,
      maxZoom: 19,
      layers: [L.tileLayer.provider('Esri.WorldImagery')],
      doubleClickZoom: false
    });

    this.mapService.map.on("load", (e) => {
      this.setRadarImage();
    });

    this.mapService.map.setView([37.09024, -95.712891], 5);

    this.mapService.map.on("moveend", () => {
      this.setRadarImage();
    });
  }

  setRadarImage() {
    this.radarBounds = this.mapService.map.getBounds();
    let dimensions = this.mapService.map.getSize();
    // this.nexradService.getNEXRADImage(dimensions.y, dimensions.x, this.radarBounds, b64 => {
    //   if (this.radarLayer) this.mapService.map.removeLayer(this.radarLayer);
    //   this.radarLayer = L.imageOverlay(b64, this.radarBounds, {
    //     opacity: .75
    //   }).addTo(this.mapService.map);
    // });
    this.nexradService.getMRMSImage(dimensions.y, dimensions.x, this.radarBounds, b64 => {
      if (this.radarLayer) this.mapService.map.removeLayer(this.radarLayer);
      this.radarLayer = L.imageOverlay(b64, this.radarBounds, {
        opacity: .75
      }).addTo(this.mapService.map);
    });
  }
}
