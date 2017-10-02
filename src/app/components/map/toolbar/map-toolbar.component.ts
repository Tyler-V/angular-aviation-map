import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, stagger, query, transition, keyframes } from '@angular/animations';

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
export class MapToolbarComponent implements OnInit {

  state: string = "closed";
  _icons: Array<string> = ["map", "layers", "my_location", "autorenew", "fullscreen"];
  icons: Array<string> = [];

  constructor() { }

  ngOnInit() { }

  toggle() {
    this.state = this.state == "closed" ? "open" : "closed";
    this.icons = this.icons.length == 0 ? this._icons : [];
  }

  click(icon: string) {
    switch (icon) {
      case "map": this.openMaps();
      case "layers": this.openLayers();
      case "my_location": this.setLocation();
      case "autorewnew": this.refresh();
      case "fullscreen": this.fullscreen();
    }
    this.toggle();
  }

  openMaps() {

  }

  openLayers() {

  }

  setLocation() {

  }

  refresh() {

  }

  fullscreen() {

  }
}
