import { Component, OnInit, Injectable,  ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { request, gql, GraphQLClient } from 'graphql-request';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

@Injectable()
export class CustomerComponent {
  
  
  @ViewChild('emailInput', { static: false }) emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('nameInput', { static: false }) nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('idInput', { static: false }) idInput!: ElementRef<HTMLInputElement>;

  

  listCustomer: any[] = [];
  
  customerInput: any = {
    email: '',
    id: 0,
    name: ''    
    
  };


  public getList(){
    return this.listCustomer;
  }

  getCustomerInput(){
    this.customerInput.name = this.nameInput.nativeElement.value;
    this.customerInput.id = this.idInput.nativeElement.value;
    this.customerInput.email = this.emailInput.nativeElement.value;
    return this.customerInput;
  }
 
  public customer!: GraphQLClient;


  constructor(){
   // this.customer = new GraphQLClient(this.endpoint);
   this.customer = new GraphQLClient(this.endpoint);
   this.fetchCustomers();
  }


  query = gql`
    query {
      allCustomers {
        id
        email
        name
      }
    }
  `;
  
  mutation = gql`
    mutation CreateCustomer($input: CustomerInput!) {
      createCustomer(input: $input) {
        id
        email
        name
      }
    }
  `;

  deleteMutation = gql`
    mutation deleteCustomer($id: Int!) {
    deleteCustomer(id: $id)
  }
  `;

  updateMutation = gql`
    mutation UpdateCustomer($input: CustomerInput!) {
      updateCustomer(input: $input) {
        id
        email
        name
      }
    }
  `;
  
  endpoint = 'http://localhost:8081/graphql'; // substitua com o endpoint GraphQL adequado

  initialize(): void {
    
  } 

  public fetchCustomers(): void {
    this.customer
      .request(this.query)
      .then((data: any) => {
        this.listCustomer = data?.allCustomers ?? [];
        return data?.allCustomers ?? [];
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  createCustomer(customerInput: any): void {
    this.customer
      .request(this.mutation, { input: customerInput })
      .then((data: any) => {
        const createdCustomer = data?.createCustomer;
        // Faça algo com o cliente criado, se necessário
        console.log('Cliente criado:', createdCustomer);
        this.fetchCustomers()
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  deleteCustomer(id: number): void {
    id = Math.floor(id);
    this.customer
      .request(this.deleteMutation, { id })
      .then((data: any) => {
        alert('Cliente deletado com sucesso!')
        console.log('Cliente deletado com sucesso!');
        this.fetchCustomers();
      })
      .catch((error: any) => {
        console.error('Erro ao deletar o cliente:', error);
      });
  }

  updateCustomer(): void {
    this.customer
      .request(this.updateMutation, { input: this.getCustomerInput() })
      .then((data: any) => {
        const updatedCustomer = data?.updateCustomer;
        // Faça algo com o cliente atualizado, se necessário
        console.log('Cliente atualizado:', updatedCustomer);
        this.fetchCustomers();
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
