package com.jeanTaiji.store.model;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue
    private Integer id;
    private Integer qty;
    @ManyToOne
    private Product product;
    @ManyToOne
    private Customer customer;


}
