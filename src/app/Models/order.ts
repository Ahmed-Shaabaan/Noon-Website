import { Time } from "@angular/common";

export interface Order {
   customerID: string,
   street: string,
   city : string,
   state:string,
   zipcode: string,
   OrderDetails:OrderDetails[],
   FirstName?:string ,
   ShippedDate?:Time ,
   DeliveryCost?:number,
   TotalPrice?:number

}


export interface OrderDetails{
   productId : number;
   quantity : number;
 }
 export interface OrderMassege{
   success : boolean;
   Message : string;
 }

