import { Artist } from './artist.model'
import { Rating } from './rating.model'

export class Artwork{
  id : number;
  title :string;
  description : string;
  releaseDate : Date;
  mediaPath : string;
  artist : any;
  ratings : Rating[];
  price : number;
}
