export class Basemaps {

  static OpenStreetMap: Basemap = {
    name: 'Open Street Map',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      maxZoom: 19,
      attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
  }

  static OpenTopoMap: Basemap = {
    name: 'Open Topographic Map',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    options: {
      maxZoom: 14,
      maxNativeZoom: 14,
      attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }
  }

  static EsriWorldStreetMap: Basemap = {
    name: 'Esri Street Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    options: {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    }
  }

  static EsriWorldTopoMap: Basemap = {
    name: 'Esri Topographic Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    options: {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    }
  }

  static EsriWorldImageryMap: Basemap = {
    name: 'Esri Imagery Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    options: {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    }
  }

  static EsriNatGeoWorldMap: Basemap = {
    name: 'National Geographic Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    options: {
      attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
    }
  }

  static EsriWorldGrayCanvas: Basemap = {
    name: 'Esri Gray Canvas Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    options: {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    }
  }

  static OpenSurferMap: Basemap = {
    name: 'Open Surfer Map',
    url: 'https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}',
    options: {
      maxZoom: 20,
      attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  }

  static NasaEarthAtNight: Basemap = {
    name: 'NASA Earth At Night',
    url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg',
    options: {
      attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.'
    }
  }

  // FAA

  static SectionalChart: Basemap = {
    name: 'US Sectional Chart',
    url: 'https://wms.chartbundle.com/tms/1.0.0/sec/{z}/{x}/{-y}.png',
    options: {
      attribution: 'Tiles &copy; Chartbundle &mdash; Source: FAA / US Sectional Chart',
      updateWhenIdle: false
    }
  }

  static TerminalAreaChart: Basemap = {
    name: 'Terminal Area Chart',
    url: 'https://wms.chartbundle.com/tms/1.0.0/tac/{z}/{x}/{-y}.png',
    options: {
      attribution: 'Tiles &copy; Chartbundle &mdash; Source: FAA / Terminal Area Chart',
      updateWhenIdle: false
    }
  }

  static HelicopterChart: Basemap = {
    name: 'Helicoper Chart',
    url: 'https://wms.chartbundle.com/tms/1.0.0/hel/{z}/{x}/{-y}.png',
    options: {
      attribution: 'Tiles &copy; Chartbundle &mdash; Source: FAA / Helicopter Chart',
      updateWhenIdle: false
    }
  }

  static IFREnrouteLowChart: Basemap = {
    name: 'IFR Enroute Low Chart',
    url: 'https://wms.chartbundle.com/tms/1.0.0/enrl/{z}/{x}/{-y}.png',
    options: {
      attribution: 'Tiles &copy; Chartbundle &mdash; Source: FAA / IFR Enroute Low Chart',
      updateWhenIdle: false
    }
  }

  static IFRAreaChart: Basemap = {
    name: 'IFR Area Chart',
    url: 'https://wms.chartbundle.com/tms/1.0.0/enra/{z}/{x}/{-y}.png',
    options: {
      attribution: 'Tiles &copy; Chartbundle &mdash; Source: FAA / IFR Area Chart',
      updateWhenIdle: false
    }
  }

  static IFREnrouteHighChart: Basemap = {
    name: 'IFR Enroute High Chart',
    url: 'https://wms.chartbundle.com/tms/1.0.0/enrh/{z}/{x}/{-y}.png',
    options: {
      attribution: 'Tiles &copy; Chartbundle &mdash; Source: FAA / IFR Enroute High Chart',
      updateWhenIdle: false
    }
  }

}

export interface Basemap {
  name: string;
  url: string;
  options: any;
}
