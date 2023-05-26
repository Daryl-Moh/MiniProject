package com.tfip2223miniproject.server.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioStock {
    private String stockSymbol;
    private Integer quantity;

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                .add("stockSymbol", getStockSymbol())
                .add("quantity", getQuantity())
                .build();
    }
}
