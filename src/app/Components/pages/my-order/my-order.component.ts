import { Order } from './../../../Models/order';
import { OrderService } from './../../../Services/orders/order.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent {
  cId: any;
  data: any={} ;
  // order:any={}
  constructor(private orderserv : OrderService) {

    //get request from web api
    let cID = localStorage.getItem("userId");
    // let cID = "fe0f8b30-663f-4661-90c6-be82f23ecd80";
    this.orderserv.getOrders(cID).subscribe(dat => {
      this.data = dat;

      setTimeout(() => {
        $('#datatableexample').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25]
        });
      }, 1);
    }, error => console.error(error));

  }
  ngOnInit(): void {
    // this.cId = "d6d94449-3fe5-421d-8d43-0b25c8b12ea3";
    // this.orderserv.getOrders(this.cId).subscribe(or => this.data = or);
    console.log(this.data);

  }
}
