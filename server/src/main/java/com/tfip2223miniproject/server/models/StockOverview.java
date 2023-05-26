package com.tfip2223miniproject.server.models;

import java.io.Serializable;

import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockOverview implements Serializable {

    private String symbol;
    private String name;
    private String description;
    private String exchange;
    private String country;
    private String sector;
    private String industry;
    private Float marketCap;
    private Float dividendPerShare;
    private Float dividendYield;
    private Float fiftyTwoWeekHigh;
    private Float fiftyTwoWeekLow;
    private Float sharesOutstanding;

    public StockOverview create (JsonObject obj) {
        StockOverview stkovr = new StockOverview();
        stkovr.setSymbol(obj.getString("Symbol"));
        stkovr.setName(obj.getString("Name"));
        stkovr.setDescription(obj.getString("Description"));
        stkovr.setExchange(obj.getString("Exchange"));
        stkovr.setCountry(obj.getString("Country"));
        stkovr.setSector(obj.getString("Sector"));
        stkovr.setIndustry(obj.getString("Industry"));
        stkovr.setMarketCap(Float.parseFloat(obj.getString("MarketCapitalization")));
        stkovr.setDividendPerShare(Float.parseFloat(obj.getString("DividendPerShare")));
        stkovr.setDividendYield(Float.parseFloat(obj.getString("DividendYield")));
        stkovr.setFiftyTwoWeekHigh(Float.parseFloat(obj.getString("52WeekHigh")));
        stkovr.setFiftyTwoWeekLow(Float.parseFloat(obj.getString("52WeekLow")));
        stkovr.setSharesOutstanding(Float.parseFloat(obj.getString("SharesOutstanding")));
        return stkovr;
    }

}
