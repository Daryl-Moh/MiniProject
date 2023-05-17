package com.tfip2223miniproject.server.models;

import java.io.Serializable;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Portfolio implements Serializable {
    
    private String userID;
    private List<PortfolioStock> portfolioStocks;

    public JsonObject toJSON() {

        return Json.createObjectBuilder()
                .add("userID", getUserID())
                .add("stockSymbols", Json.createArrayBuilder(this.getPortfolioStocks()))
                .build();
    }

    // private String userID;
    // private List<String> stockSymbols;

    // public JsonObject toJSON() {

    //     return Json.createObjectBuilder()
    //             .add("userID", getUserID())
    //             .add("stockSymbols", Json.createArrayBuilder(this.getStockSymbols()))
    //             .build();
    // }
}


