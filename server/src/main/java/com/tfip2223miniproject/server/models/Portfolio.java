package com.tfip2223miniproject.server.models;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Portfolio implements Serializable {
    
    private String userID;
    private List<Stock> listOfStocks;
}
