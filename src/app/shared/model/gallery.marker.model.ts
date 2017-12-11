export class Marker {

  address: string;
  longitude: number;
  latitude: number;
  isOpen: boolean;
  constructor (address: string, longitude: number, latitude: number, isOpen: boolean)  {
    this.address = address;
    this.longitude = longitude;
    this.latitude = latitude;
    this.isOpen = isOpen;
  }
}
