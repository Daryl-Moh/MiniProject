package com.tfip2223miniproject.server.models;

import java.io.Serializable;

import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class YahooStock implements Serializable {
    
    private String symbol;
    private String currency;
    private Float ask;
    private Float trailingAnnualDividendRate;
    private Float trailingAnnualDividendYield;
    

    public YahooStock create (JsonObject obj) {
        YahooStock ystk = new YahooStock();
        ystk.setSymbol(obj.getString("symbol"));
        ystk.setCurrency(obj.getString("currency"));
        ystk.setAsk(Float.parseFloat(obj.getJsonNumber("ask").toString()));
        ystk.setTrailingAnnualDividendRate(Float.parseFloat(obj.getJsonNumber("trailingAnnualDividendRate").toString()));
        ystk.setTrailingAnnualDividendYield(Float.parseFloat(obj.getJsonNumber("trailingAnnualDividendYield").toString()));

        return ystk;
    }
}
