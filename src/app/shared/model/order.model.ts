import { Artwork } from "./artwork.model";

export class Order{
    id: number;
    orderDate: Date;
    artworks: Artwork[];
    totalAmount: number;
}