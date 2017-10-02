import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';

@Injectable()
export class NexradService {

  _proxy = "https://cors-anywhere.herokuapp.com/";

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
    params.append('BBOX', this.latLngBoundsToBBOX(bounds));
    return this.http.get(url, {
      headers: headers,
      params: params
    });
  }

  getNEXRADImage(height: number, width: number, bounds: L.LatLngBounds, onload: (string) => void, time?: number) {
    let url = "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?&REQUEST=GetMap&TRANSPARENT=true&FORMAT=image/png&BGCOLOR=0x000000&VERSION=1.1.1&LAYERS=nexrad-n0r&STYLES=default&CRS=EPSG:4326&SRS=EPSG:4326";
    url += "&WIDTH=" + width;
    url += "&HEIGHT=" + height;
    url += "&BBOX=" + this.latLngBoundsToBBOX(bounds);
    if (time) url += "&TIME=" + String(time);

    this.getImage(url, height, width, (dataUrl) => {
      onload(dataUrl)
    });
  }

  getMRMSImage(height: number, width: number, bounds: L.LatLngBounds, onload: (string) => void, age: number = 0) {
    let url = "https://skyvector.com";
    let path = "/wx/frame?"
    path += "ext=" + this.latLngBoundsToBBOX(bounds);
    path += "&size=" + width + "x" + height;
    path += "&layers=nexrad";
    path += "&chart=301";
    path += "&edition=1710";
    path += "&age=" + String(age);
    path += "&cb=";
    url = url + path;

    this.getImage(url, height, width, (dataUrl) => {
      onload(dataUrl)
    });
  }

  getImage(url, height, width, callback: (string) => void) {

    var img = new Image();

    img.onload = (e: any) => {
      var canvas: any = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.height = height;
      canvas.width = width;
      ctx.drawImage(e.path[0], 0, 0);
      let dataURL = canvas.toDataURL();
      callback(dataURL);
    };

    img.setAttribute('crossOrigin', 'anonymous');
    img.src = this._proxy + url;
  }

  private latLngBoundsToBBOX(bounds: L.LatLngBounds): string {
    let array = [];
    array.push(bounds.getSouthWest().lng);
    array.push(bounds.getSouthWest().lat);
    array.push(bounds.getNorthEast().lng);
    array.push(bounds.getNorthEast().lat);
    return array.join(",");
  }
}
