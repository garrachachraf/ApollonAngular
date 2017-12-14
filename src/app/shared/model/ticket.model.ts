import {Event} from './event.model';
import { User } from './user.module';

export class Ticket {
  id: number;
  title: string;
  note: string;
  price: number;
  orderDate: number;
  event: Event;
  user: User;
}
