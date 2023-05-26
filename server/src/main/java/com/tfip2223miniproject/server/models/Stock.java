package com.tfip2223miniproject.server.models;

import java.io.Serializable;

import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stock implements Serializable {
    private String symbol;
    private String name;
    private String type;
    private String region;
    private String currency;

    public static Stock create (JsonObject obj) {
        Stock stk = new Stock();
        stk.setSymbol(obj.getString("1. symbol"));
        stk.setName(obj.getString("2. name"));
        stk.setType(obj.getString("3. type"));
        stk.setRegion(obj.getString("4. region"));
        stk.setCurrency(obj.getString("8. currency"));
        return stk;
    }
}


