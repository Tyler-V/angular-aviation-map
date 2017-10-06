import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { trigger, state, style, animate, stagger, query, transition, keyframes } from '@angular/animations';
import { MapService } from '../services/map.service';
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

  setLocationSubscription: Subscription;

  isMapsOpen: boolean;

  state: string = "closed";
  _icons: Array<string> = ["map", "layers", "my_location", "autorenew", "fullscreen"];
  icons: Array<string> = [];

  constructor(private mapService: MapService) {
    this.setLocationSubscription = this.mapService.setLocationEvent.subscribe(() => {
      this.setLocation();
    })
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
      case "autorewnew": this.refresh(); break;
      case "fullscreen": this.fullscreen(); break;
    }
    this.toggle();
  }

  openMaps() { }

  openLayers() { }

  setLocation() {
    let success = (position) => {
      this.mapService.map.flyTo(new L.LatLng(position.coords.latitude, position.coords.longitude), 10, { noMoveStart: true });
    }

    let error = (error) => { }

    let options: PositionOptions = {
      enableHighAccuracy: true,
    }

    window.navigator.geolocation.getCurrentPosition(success, error, options)
  }

  refresh() { }

  fullscreen() {
    let _element: any = this.mapService.map.getContainer();
    if (!this.mapService.isFullScreen) {
      if (_element.requestFullscreen) _element.requestFullscreen();
      else if (_element.webkitRequestFullscreen) _element.webkitRequestFullscreen();
      else if (_element.mozRequestFullScreen) _element.mozRequestFullScreen();
      else if (_element.msRequestFullscreen) _element.msRequestFullscreen();
    } else {
      let _document: any = document;
      if (_document.exitFullScreen) _document.exitFullScreen();
      else if (_document.webkitExitFullscreen) _document.webkitExitFullscreen();
      else if (_element.mozCancelFullScreen) _document.mozCancelFullScreen();
      else if (_element.msExitFullscreen) _document.msExitFullscreen();
    }
    this.mapService.isFullScreen = !this.mapService.isFullScreen;
  }
}
