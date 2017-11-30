import { Artist } from './artist.model'
import { Artwork } from './artwork.model'

export class Showroom{
  id : number;
  title : string;
  description : string;
  artWorks : Artwork[];
  artist : Artist;
}
