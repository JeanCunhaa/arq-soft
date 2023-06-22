package com.jeanTaiji.store.repository;

import com.jeanTaiji.store.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Integer> {



}
