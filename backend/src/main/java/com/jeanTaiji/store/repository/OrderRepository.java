package com.jeanTaiji.store.repository;

import com.jeanTaiji.store.model.Customer;
import com.jeanTaiji.store.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    List<Order> findByCustomer(Customer customer);
}
