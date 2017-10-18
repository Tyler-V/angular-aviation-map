export interface Overlay {
  name: string;
  type: OverlayType;
  image: string;
  url?: string;
  options?: any;
}

export enum OverlayType {
  TileLayer = 'Tile Layer',
  ImageOverlay = 'Image Overlay'
}

export class Overlays {

  static OWM_Precipitation: Overlays = {
    name: 'Precipitation Layer',
    type: OverlayType.TileLayer,
    image: './assets/images/precipitation.png',
    url: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=63c51d69edcd11dbefffb1f12635c313',
    options: {
      opacity: .5
    }
  }

  static Boundaries: Overlays = {
    name: 'Boundaries',
    type: OverlayType.TileLayer,
    image: './assets/images/boundaries.png',
    url: 'https://stamen-tiles-d.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.png',
    options: {
      opacity: .5
    }
  }

  static Labels: Overlays = {
    name: 'Labels',
    type: OverlayType.TileLayer,
    image: './assets/images/labels.png',
    url: 'https://stamen-tiles-a.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png',
    options: {
      opacity: .5
    }
  }

  static MRMS: Overlays = {
    name: 'MRMS Weather Radar',
    type: OverlayType.ImageOverlay,
    image: './assets/images/mrms.png',
  }

  static NEXRAD: Overlays = {
    name: 'NEXRAD Radar',
    type: OverlayType.ImageOverlay,
    image: './assets/images/nexrad.png',
  }
}
