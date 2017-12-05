import { User } from './user.module';
import { Artwork } from './artwork.model';
export class Collection {
         id: number;
         title: string;
         description: string;
         artworks: Artwork[];
         artist: User;
       }
