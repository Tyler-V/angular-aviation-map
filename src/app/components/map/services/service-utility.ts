export class Utility {

  public static latLngBoundsToBBOX(bounds: L.LatLngBounds): string {
    let array = [];
    array.push(bounds.getSouthWest().lng);
    array.push(bounds.getSouthWest().lat);
    array.push(bounds.getNorthEast().lng);
    array.push(bounds.getNorthEast().lat);
    return array.join(",");
  }

  public static getImage(url, height, width, callback: (string) => void, proxy: string = "") {
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
    img.src = proxy + url;
  }
}
