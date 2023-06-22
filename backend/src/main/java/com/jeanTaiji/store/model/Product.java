package com.jeanTaiji.store.model;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue
    private Integer id;
    private String title;
    private String desc;
    private Float price;


    @OneToMany(mappedBy = "product")
    private Set<Order> orders = new HashSet<>();

    public Product (String title, String desc, Float price){
        this.title = title;
        this.desc = desc;
        this.price = price;
    }
}
