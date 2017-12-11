import {Marker} from './gallery.marker.model';
import {Pricing} from './gallery.pricing.model';
import {Schedule} from './schedule.model';
import {GalleryOwner} from './galleryowner.model' ;

export class Gallery {
  id: number;
  name: string;
  maxCapacity: number;
  location: Marker;
  pricing: Pricing;
  surface: number;
  description: string;
  galleryOwner: GalleryOwner;
  album: any[];
  calendar: Schedule[];
}
