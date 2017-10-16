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
    url: 'http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=63c51d69edcd11dbefffb1f12635c313',
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
