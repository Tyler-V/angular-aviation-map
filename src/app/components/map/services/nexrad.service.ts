import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';

@Injectable()
export class NexradService {

  constructor(private http: Http) { }

  getRadar(height: number, width: number, bounds: L.LatLngBounds) {
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
    params.append('WIDTH', String(width));
    params.append('HEIGHT', String(height));
    params.append('BBOX', this._latLngBoundsToBBOX(bounds));
    return this.http.get(url, {
      headers: headers,
      params: params
    });
  }

  getRadarImage(height: number, width: number, bounds: L.LatLngBounds, time: any, onload: (string) => void) {
    let url = "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?&REQUEST=GetMap&TRANSPARENT=true&FORMAT=image/png&BGCOLOR=0x000000&VERSION=1.1.1&LAYERS=nexrad-n0r&STYLES=default&CRS=EPSG:4326&SRS=EPSG:4326";
    url += "&WIDTH=" + width;
    url += "&HEIGHT=" + height;
    url += "&BBOX=" + this._latLngBoundsToBBOX(bounds);
    if (time) url += "&TIME=" + time;

    var img = new Image();

    img.onload = (e: any) => {
      var canvas: any = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.height = height;
      canvas.width = width;
      ctx.drawImage(e.path[0], 0, 0);
      let dataURL = canvas.toDataURL();
      onload(dataURL);
    };

    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
  }

  private _latLngBoundsToBBOX(bounds: L.LatLngBounds): string {
    let array = [];
    array.push(bounds.getSouthWest().lng);
    array.push(bounds.getSouthWest().lat);
    array.push(bounds.getNorthEast().lng);
    array.push(bounds.getNorthEast().lat);
    return array.join(",");
  }
}
