package com.jeanTaiji.store.controller;

import com.jeanTaiji.store.model.Product;
import com.jeanTaiji.store.model.input.CreateProductInput;
import com.jeanTaiji.store.repository.ProductRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductRepository repository;
    //Injeção de dependência via construtor
    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @QueryMapping
    public Iterable<Product> allProducts() {
        return repository.findAll();
    }

    @QueryMapping
    public Optional<Product> getProduct(@Argument Integer id) {
        return repository.findById(id);
    }

    @MutationMapping
    public Product createProduct(@Argument("input") CreateProductInput input){
        Product product = new Product(input.getTitle(), input.getDesc(), input.getPrice());
        return repository.save(product);
    }

    @MutationMapping
    public boolean deleteProduct(@Argument int id) {
        Optional<Product> product = repository.findById(id);
        if (product.isPresent()) {
            repository.delete(product.get());
            return true;
        }
        return false;
    }
    
    @MutationMapping
    public Product updateProduct(@Argument("input") CreateProductInput productInput){
        Optional<Product> product = repository.findById(productInput.getId());
        if(product.isPresent()){
            product.get().setDesc(productInput.getDesc());
            product.get().setTitle(productInput.getTitle());
            product.get().setPrice(productInput.getPrice());
            repository.save(product.get());
            return product.get();
        }
        return null;
    }

}
