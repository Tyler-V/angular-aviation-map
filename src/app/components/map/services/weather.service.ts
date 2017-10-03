import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Utility } from './service-utility';
import { MapService } from './map.service';

@Injectable()
export class WeatherService {

  _proxy = "https://cors-anywhere.herokuapp.com/";

  constructor(private http: Http, private mapService: MapService) { }

  getRadar() {
    let dimensions = this.mapService.map.getSize();
    let bounds = this.mapService.map.getBounds();
    let url = "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?";
    let headers = new Headers();
    headers.append('Accept', 'image/webp,image/apng,image/*,*/*;q=0.8');
    let params = new URLSearchParams();
    params.append('REQUEST', 'GetMap');
    params.append('TRANSPARENT', 'true');
    params.append('FORMAT', 'image/png');
    params.append('BGCOLOR', '0x000000');
    params.append('VERSION', '1.1.1');
    params.append('LAYERS', 'nexrad-n0r');
    params.append('STYLES', 'default');
    params.append('CRS', 'EPSG:4326');
    params.append('SRS', 'EPSG:4326');
    params.append('WIDTH', String(dimensions.x));
    params.append('HEIGHT', String(dimensions.y));
    params.append('BBOX', Utility.latLngBoundsToBBOX(bounds));
    return this.http.get(url, {
      headers: headers,
      params: params
    });
  }

  getNEXRAD(onload: (string) => void, time?: number) {
    let dimensions = this.mapService.map.getSize();
    let bounds = this.mapService.map.getBounds();
    let width = String(dimensions.x);
    let height = String(dimensions.y);
    let url = "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?";
    url += "&REQUEST=" + "GetMap";
    url += "&TRANSPARENT=" + "true";
    url += "&FORMAT=" + "image/png";
    url += "&BGCOLOR=" + "0x000000";
    url += "&VERSION=" + "1.1.1";
    url += "&LAYERS=" + "nexrad-n0r";
    url += "&STYLES=" + "default";
    url += "&CRS=" + "EPSG:4326";
    url += "&SRS=" + "EPSG:4326";
    url += "&WIDTH=" + width;
    url += "&HEIGHT=" + height;
    url += "&BBOX=" + Utility.latLngBoundsToBBOX(bounds);
    if (time) url += "&TIME=" + String(time);

    Utility.getImage(url, height, width, (dataUrl) => {
      onload(dataUrl)
    });
  }

  getMRMS(onload: (string) => void, age: number = 0) {
    let dimensions = this.mapService.map.getSize();
    let bounds = this.mapService.map.getBounds();
    let width = String(dimensions.x);
    let height = String(dimensions.y);
    let url = "https://skyvector.com";
    let path = "/wx/frame?"
    path += "ext=" + Utility.latLngBoundsToBBOX(bounds);
    path += "&size=" + width + "x" + height;
    path += "&layers=nexrad";
    path += "&chart=301";
    path += "&edition=1710";
    path += "&age=" + String(age);
    path += "&cb=";
    url = url + path;

    Utility.getImage(url, height, width, (dataUrl) => {
      onload(dataUrl)
    }, this._proxy);
  }
}
