import { Component, OnInit, Injectable,  ViewChild, ElementRef,EventEmitter } from '@angular/core';
import { request, gql, GraphQLClient } from 'graphql-request';
import { CustomerComponent } from '../customer/customer.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],

})
export class OrderComponent {

  @ViewChild('productInput', { static: false }) productInput!: ElementRef<HTMLInputElement>;
  @ViewChild('qtyInput', { static: false }) qtyInput!: ElementRef<HTMLInputElement>;
  @ViewChild('idInput', { static: false }) idInput!: ElementRef<HTMLInputElement>;
  @ViewChild('customerInput', { static: false }) customerInput!: ElementRef<HTMLInputElement>;
 //rever!!!!!!!!!!!!!!!!!!!!

  listCustomer: any[] = []
  listOrder: any[] = [];
  
  orderInput: any = {
    idCustomer: 0,
    idOrder: 0,
    idProduct: 0,
    qty: ''    
    
  };

  geraClientesBotao(){
    this.customer.fetchCustomers()
    this.listCustomer = this.customer.getList();
  }

  ngOnInit() {
    this.order = new GraphQLClient(this.endpoint);
    
  }

  constructor(private customer: CustomerComponent) {
    //this.customer.customer = new GraphQLClient(this.endpoint)
    
  }




  getOrderInput(){
    this.orderInput.qty = this.qtyInput.nativeElement.value;
    this.orderInput.idCustomer = this.customerInput.nativeElement.value;
    this.orderInput.idProduct = this.productInput.nativeElement.value;
    return this.orderInput;
  }
 
  private order!: GraphQLClient;


  query = gql`
    query {
      allOrders {
        id
        qty
        customer {
          id
          name
          email
      # Outros campos do Customer, se houver
        }
        product {
        id
        title
        price
        desc
        # Outros campos do Product, se houver
        }
      }
    }
  `;
  
  mutation = gql`
    mutation CreateOrder($input: OrderInput!) {
      createOrder(input: $input) {
        idOrder
        idProduct
        idCustomer
        qty
      }
    }
  `;

  deleteMutation = gql`
    mutation deleteOrder($id: Int!) {
    deleteOrder(idOrder: $idOrder)
  }
  `;

  
  endpoint = 'http://localhost:8081/graphql'; 


  fetchOrders(): void {
    this.order
      .request(this.query)
      .then((data: any) => {
        this.listOrder = data?.allOrders ?? {};
    
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  createOrder(orderInput: any): void {
    this.order
      .request(this.mutation, { input: orderInput })
      .then((data: any) => {
        const createdOrder = data?.createOrder;
        console.log('Order criado:', createdOrder);
        this.fetchOrders()
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  deleteOrder(idOrder: number): void {
    idOrder = Math.floor(idOrder);
    this.order
      .request(this.deleteMutation, { idOrder })
      .then((data: any) => {
        alert('Cliente deletado com sucesso!')
        console.log('Cliente deletado com sucesso!');
        this.fetchOrders();
      })
      .catch((error: any) => {
        console.error('Erro ao deletar o cliente:', error);
      });
  }

  
}
