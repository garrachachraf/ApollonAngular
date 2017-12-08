import { AuthenticationService } from './../../authentication/authentication.service';
import { OrderService } from './../shared/order.service';
import { Order } from './../../shared/model/order.model';
import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers:[OrderService]
})
export class OrderComponent implements OnInit {
  currentOrder: Order;
  orders:Order[];
  constructor(
    private orderService:OrderService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this. getOrders();
  }
  getOrders(){
    this.orderService.getOrdersByUserId(this.authenticationService.getToken().id).subscribe(
      res=>{
        console.log("hellooo");
        console.log(res);
        this.orders= res;
      }
    )
  }
}
