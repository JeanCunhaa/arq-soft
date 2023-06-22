import { Component, OnInit, Injectable,  ViewChild, ElementRef } from '@angular/core';
import { request, gql, GraphQLClient } from 'graphql-request';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  @ViewChild('titleInput', { static: false }) titleInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descInput', { static: false }) descInput!: ElementRef<HTMLInputElement>;
  @ViewChild('idInput', { static: false }) idInput!: ElementRef<HTMLInputElement>;
  @ViewChild('priceInput', { static: false }) priceInput!: ElementRef<HTMLInputElement>;

  


  listProduct: any[] = [];
  
  productInput: any = {
    desc: '',
    id: 0,
    title: '',
    price: 0
  };

  getProductInput(){
    this.productInput.desc = this.descInput.nativeElement.value;
    this.productInput.id = this.idInput.nativeElement.value;
    this.productInput.title = this.titleInput.nativeElement.value;
    this.productInput.price = this.priceInput.nativeElement.value;
    return this.productInput;
  }
 
  private client!: GraphQLClient;


  constructor(){
   // this.client = new GraphQLClient(this.endpoint);
    
  }


  query = gql`
    query {
      allProducts {
        id
        title
        desc
        price
      }
    }
  `;
  
  mutation = gql`
    mutation CreateProduct($input: ProductInput!) {
      createProduct(input: $input) {
        id
        title
        desc
        price
      }
    }
  `;

  deleteMutation = gql`
    mutation deleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
  `;

  updateMutation = gql`
    mutation UpdateProduct($input: ProductInput!) {
      updateProduct(input: $input) {
        id
        title
        desc
        price
      }
    }
  `;
  
  endpoint = 'http://localhost:8081/graphql'; // substitua com o endpoint GraphQL adequado

   ngOnInit(): void {
    this.client = new GraphQLClient(this.endpoint);
    this.fetchProducts();
  } 

  fetchProducts(): void {
    this.client
      .request(this.query)
      .then((data: any) => {
        this.listProduct = data?.allProducts ?? [];
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  createProduct(productInput: any): void {
    this.client
      .request(this.mutation, { input: productInput })
      .then((data: any) => {
        const createdProduct = data?.createProduct;
        // Faça algo com o produto criado, se necessário
        console.log('Produto criado:', createdProduct);
        this.fetchProducts()
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  deleteProduct(id: number): void {
    id = Math.floor(id);
    this.client
      .request(this.deleteMutation, { id })
      .then((data: any) => {
        alert('Produto deletado com sucesso!')
        console.log('Produto deletado com sucesso!');
        this.fetchProducts();
      })
      .catch((error: any) => {
        console.error('Erro ao deletar o produto:', error);
      });
  }

  updateProduct(): void {
    this.client
      .request(this.updateMutation, { input: this.getProductInput() })
      .then((data: any) => {
        const updatedProduct = data?.updateProduct;
        // Faça algo com o produto atualizado, se necessário
        console.log('Produto atualizado:', updatedProduct);
        this.fetchProducts();
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
