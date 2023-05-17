package com.tfip2223miniproject.server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioStock {
    private String stockSymbol;
    private Integer quantity;

    
}
