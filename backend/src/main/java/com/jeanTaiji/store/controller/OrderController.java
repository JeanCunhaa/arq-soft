package com.jeanTaiji.store.controller;

import com.jeanTaiji.store.model.Customer;
import com.jeanTaiji.store.model.Product;
import com.jeanTaiji.store.model.input.CreateOrder;
import com.jeanTaiji.store.repository.CustomerRepository;
import com.jeanTaiji.store.repository.OrderRepository;
import com.jeanTaiji.store.repository.ProductRepository;
import com.jeanTaiji.store.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    //Injeção de dependência via a anotação @Autowired
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ProductRepository productRepository;



    @QueryMapping
    public Iterable<Order> allOrders() {
        return orderRepository.findAll();
    }

    @QueryMapping
    public Optional<Order> getOrder(@Argument Integer id) {
        return orderRepository.findById(id);
    }

    @MutationMapping
    public boolean deleteOrder(@Argument int id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            orderRepository.delete(order.get());
            return true;
        }
        return false;
    }

    @MutationMapping
    public Order createOrder(@Argument CreateOrder createOrder){
        Optional<Customer> customer = customerRepository.findById(createOrder.getIdCustomer());
        Optional<Product> product = productRepository.findById(createOrder.getIdProduct());

        if (product.isEmpty() || customer.isEmpty()){
            return null;
        }
        Order order = new Order();
        order.setCustomer(customer.get());
        order.setProduct(product.get());
        order.setQty(createOrder.getQty());
        order = orderRepository.save(order);
        return order;
    }

}
