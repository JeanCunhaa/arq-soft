package com.jeanTaiji.store.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCustomerInput {

    private Integer id;
    private String name;
    private String email;


}
