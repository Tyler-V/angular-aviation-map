import { Component, OnInit, OnDestroy, Input, Renderer2 } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { trigger, state, style, animate, stagger, query, transition, keyframes } from '@angular/animations';
import { MapService } from '../map.service';
import { Subscription } from 'rxjs/Subscription';
import * as L from 'leaflet';

@Component({
  selector: 'map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('open', style({ opacity: 1 })),
      state('closed', style({ opacity: 0 })),
      transition('closed => open', [
        animate('500ms ease-in', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, offset: .5 }),
        ]))
      ]),
      transition('open => closed', [
        animate('500ms ease-in', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: .5 }),
        ]))
      ])
    ]),
    trigger('fadeOut', [
      state('open', style({ opacity: 0 })),
      state('closed', style({ opacity: 1 })),
      transition('closed => open', [
        animate('500ms ease-in', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: .5 }),
        ]))
      ]),
      transition('open => closed', [
        animate('500ms ease-in', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, offset: .5 }),
        ]))
      ])
    ]),
    trigger('spinIn', [
      transition('closed => open', [
        animate('500ms ease-in', keyframes([
          style({ transform: 'rotate(0)', offset: 0 }),
          style({ transform: 'rotate(180deg)', offset: 1 }),
        ]))
      ]),
      transition('open => closed', [
        animate('500ms ease-out', keyframes([
          style({ transform: 'rotate(180deg)', offset: 0 }),
          style({ transform: 'rotate(0)', offset: 1 }),
        ]))
      ])
    ]),
    trigger('bounceIn', [
      transition('closed => open', [
        query(':enter', style({ opacity: 0 })),
        query(':enter', stagger('100ms', [
          animate('700ms ease-in', keyframes([
            style({ opacity: 1, transform: 'translateX(-100px)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(20px)', offset: .25 }),
            style({ opacity: 1, transform: 'translateX(-10px)', offset: .5 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
          ]))
        ]))
      ]),
      transition('open => closed', [
        query(':leave', stagger('-100ms', [
          animate('700ms ease-out', keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateX(10px)', offset: .3 }),
            style({ opacity: 0, transform: 'translateX(-100px)', offset: 1 }),
          ]))
        ]))
      ])
    ])
  ]
})
export class MapToolbarComponent implements OnInit, OnDestroy {

  setViewSubscription: Subscription;
  setLocationSubscription: Subscription;

  isMapsOpen: boolean;

  state: string = "closed";
  _icons: Array<string> = ["map", "layers", "my_location", "fullscreen"];
  icons: Array<string> = [];

  constructor(private mapService: MapService, private renderer: Renderer2) {
    this.setViewSubscription = this.mapService.setViewEvent.subscribe(() => {
      this.setView();
    });
    this.setLocationSubscription = this.mapService.setLocationEvent.subscribe(zoom => {
      this.setLocation(zoom);
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.setLocationSubscription.unsubscribe();
  }

  toggle() {
    this.state = this.state == "closed" ? "open" : "closed";
    this.icons = this.icons.length == 0 ? this._icons : [];
  }

  click(icon: string) {
    switch (icon) {
      case "map": this.openMaps(); break;
      case "layers": this.openLayers(); break;
      case "my_location": this.setLocation(); break;
      case "fullscreen": this.fullscreen(); break;
    }
    this.toggle();
  }

  openMaps() {
    this.mapService.openBasemaps = true;
  }

  openLayers() {
    this.mapService.openOverlays = true;
  }

  setView() {
    this.getLocation(latLng => {
        this.mapService.map.setView(latLng, 8);
    })
  }

  setLocation(zoom?: number) {
    if (this.mapService.locationMarker)
      this.mapService.map.removeLayer(this.mapService.locationMarker);

    if (!this.mapService.location) {
      let success = (position) => {
        let latLng = new L.LatLng(position.coords.latitude, position.coords.longitude);
        if (zoom) {
          this.mapService.map.setView(latLng, zoom);
        }
        else {
          this.mapService.map.flyTo(latLng, 10, {
            duration: 1,
            noMoveStart: true
          });
        }
        let pulse = L.divIcon({
          className: 'css-icon',
          html: '<div class="leaflet-pulsing"></div><div class="leaflet-pulsing-icon">',
          iconSize: [20, 20]
        });
        this.mapService.locationMarker = L.marker(latLng, { icon: pulse }).addTo(this.mapService.map);
      }

      let error = (error) => { }

      let options: PositionOptions = {
        enableHighAccuracy: true,
      }

      window.navigator.geolocation.getCurrentPosition(success, error, options);
    }

    this.mapService.location = !this.mapService.location;
  }

  getLocation(callback: (any) => void) {
    let success = (position) => {
      let latLng = new L.LatLng(position.coords.latitude, position.coords.longitude);
      callback(latLng);
    }
    let error = (error) => { }
    let options: PositionOptions = { enableHighAccuracy: true }
    window.navigator.geolocation.getCurrentPosition(success, error, options);
  }

  refresh() { }

  fullscreen() {
    let _element: any = this.mapService.map.getContainer();
    if (!this.mapService.fullscreen) {
      if (_element.requestfullscreen) _element.requestfullscreen();
      else if (_element.webkitRequestfullscreen) _element.webkitRequestfullscreen();
      else if (_element.mozRequestfullscreen) _element.mozRequestfullscreen();
      else if (_element.msRequestfullscreen) _element.msRequestfullscreen();
      this.renderer.addClass(_element, "fullscreen");
    } else {
      let _document: any = document;
      if (_document.exitfullscreen) _document.exitfullscreen();
      else if (_document.webkitExitfullscreen) _document.webkitExitfullscreen();
      else if (_element.mozCancelfullscreen) _document.mozCancelfullscreen();
      else if (_element.msExitfullscreen) _document.msExitfullscreen();
      this.renderer.removeClass(_element, "fullscreen");
    }
    this.mapService.fullscreen = !this.mapService.fullscreen;
  }
}
