import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Utility } from './service-utility';
import { MapService } from '../map.service';

@Injectable()
export class FaaService {

  sectionalLayers = new Map<number, L.LatLngBounds>();

  url: string = "https://nfdc.faa.gov/geoserver/wms?";

  constructor(private http: Http, private mapService: MapService) { }

  getVFRSectional(onload: (string) => void) {
    let zoom = this.mapService.map.getZoom();
    let bounds = this.mapService.map.getBounds();
    let dimensions = this.mapService.map.getSize();
    let width = String(dimensions.x + 100);
    let height = String(dimensions.y + 100);
    let url = this.url;
    url += "LAYERS=" + "us_sectionals";
    url += "&TRANSPARENT=" + "FALSE";
    url += "&FORMAT=" + "image/png";
    url += "&BGCOLOR=" + "0x000000";
    url += "&SERVICE=" + "WMS";
    url += "&VERSION=" + "1.1.1";
    url += "&REQUEST=" + "GetMap";
    url += "&STYLES=" + "";
    url += "&SRS=" + "EPSG:4326";
    url += "&BBOX=" + Utility.latLngBoundsToBBOX(bounds);
    url += "&WIDTH=" + String(width);
    url += "&HEIGHT=" + String(height);

    Utility.getImage(url, height, width, (dataUrl) => {
      onload(dataUrl)
    });
  }
}

export enum Layers {
  us_sectionals
}

export interface SectionalLayer {
  zoom: number,
  bounds: L.LatLngBounds
}
