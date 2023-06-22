package com.jeanTaiji.store.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrder {
    private Integer idOrder;
    private Integer idCustomer;
    private Integer idProduct;
    private Integer qty;

}
