package com.jeanTaiji.store.repository;

import com.jeanTaiji.store.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Integer> {

}
