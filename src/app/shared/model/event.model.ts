import { User } from './user.module';
import {Gallery} from './gallery.model';

export class Event{
    id: number;
    title: string;
    description: string;
    creationDate: number;
    startDate: number;
    endDate: number;
    capacity: number;
    priceTicket: number;
    gallery: Gallery;
    user: User;
}
