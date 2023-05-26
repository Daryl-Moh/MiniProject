package com.tfip2223miniproject.server.models;

import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockGlobalQuote {
    private String symbol;
    private Float price;
    private String latestTradingDay;
    private Float change;
    private String changePercent;

    public StockGlobalQuote create (JsonObject obj) {
        StockGlobalQuote stockglobalquote = new StockGlobalQuote();
        JsonObject tmpObj = obj.getJsonObject("Global Quote");
        stockglobalquote.setSymbol(tmpObj.getString("01. symbol"));
        stockglobalquote.setPrice(Float.parseFloat(tmpObj.getString("05. price")));
        stockglobalquote.setLatestTradingDay(tmpObj.getString("07. latest trading day"));
        stockglobalquote.setChange(Float.parseFloat(tmpObj.getString("09. change")));
        stockglobalquote.setChangePercent(tmpObj.getString("10. change percent"));
        return stockglobalquote;
    }
}
