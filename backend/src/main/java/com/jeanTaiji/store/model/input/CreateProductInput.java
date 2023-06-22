package com.jeanTaiji.store.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductInput {

    private Integer id;
    private String title;
    private String desc;
    private Float price;


}
