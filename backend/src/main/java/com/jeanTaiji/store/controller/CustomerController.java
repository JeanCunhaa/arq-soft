package com.jeanTaiji.store.controller;

import com.jeanTaiji.store.model.Customer;
import com.jeanTaiji.store.model.input.CreateCustomerInput;
import com.jeanTaiji.store.repository.CustomerRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    private final CustomerRepository repository;
    //Injeção de dependência via construtor
    public CustomerController(CustomerRepository repository) {
        this.repository = repository;
    }

    @QueryMapping
    public Iterable<Customer> allCustomers() {
        return repository.findAll();
    }

    @QueryMapping
    public Optional<Customer> getCustomer(@Argument Integer id) {
        return repository.findById(id);
    }

    @MutationMapping
    public Customer createCustomer(@Argument("input") CreateCustomerInput input){
        Customer customer = new Customer(input.getName(), input.getEmail());
        return repository.save(customer);
    }

    @MutationMapping
    public boolean deleteCustomer(@Argument int id) {
        Optional<Customer> customer = repository.findById(id);
        if (customer.isPresent()) {
            repository.delete(customer.get());
            return true;
        }
        return false;
    }
    
    @MutationMapping
    public Customer updateCustomer(@Argument("input") CreateCustomerInput customerInput){
        Optional<Customer> customer = repository.findById(customerInput.getId());
        if(customer.isPresent()){
            customer.get().setEmail(customerInput.getEmail());
            customer.get().setName(customerInput.getName());
            repository.save(customer.get());
            return customer.get();
        }
        return null;
    }

}
