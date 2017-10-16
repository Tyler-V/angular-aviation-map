import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { MapService } from '../../map.service';
import * as L from 'leaflet';

@Component({
  selector: 'map-preview',
  templateUrl: './map-preview.component.html',
  styleUrls: ['./map-preview.component.scss']
})
export class MapPreviewComponent implements OnInit {

  @Input() basemap;

  map: L.Map;
  loading: boolean = true;

  constructor(private elementRef: ElementRef, private mapService: MapService) { }

  ngOnInit() {
    this.map = new L.Map(this.elementRef.nativeElement, {
      attributionControl: false,
      zoomControl: false,
      center: this.mapService.map.getCenter(),
      zoom: this.mapService.map.getZoom(),
      dragging: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      scrollWheelZoom: false
    });
    let tileLayer: L.TileLayer = new L.TileLayer(this.basemap.url, this.basemap.options);
    tileLayer.addTo(this.map);
    tileLayer.on('load', () => {
      this.loading = false;
    })
  }
}
