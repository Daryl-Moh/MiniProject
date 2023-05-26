package com.tfip2223miniproject.server.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.tfip2223miniproject.server.Constants.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockPriceMonthly implements Serializable {
    
    private String symbol;
    private List<Float> closeArray = new ArrayList<Float>() ;
    private List<Long> volumeArray = new ArrayList<Long>();
    private String lastRefreshed;

    public StockPriceMonthly create (JsonObject obj) {
        StockPriceMonthly stockpricemonthly = new StockPriceMonthly();

        this.lastRefreshed = obj.getJsonObject("Meta Data").getString("3. Last Refreshed");
        stockpricemonthly.setSymbol(obj.getJsonObject("Meta Data").getString("2. Symbol"));
        stockpricemonthly.closeArray.add(Float.parseFloat(obj.getJsonObject("Monthly Time Series").getJsonObject(this.lastRefreshed.toString()).getString("4. close")));
        stockpricemonthly.volumeArray.add(Long.parseLong(obj.getJsonObject("Monthly Time Series").getJsonObject(this.lastRefreshed.toString()).getString("5. volume")));
        stockpricemonthly.closeArray.add(Float.parseFloat(obj.getJsonObject("Monthly Time Series").getJsonObject(LAST_DAY_OF_MONTHS_2023[0]).getString("4. close")));
        stockpricemonthly.volumeArray.add(Long.parseLong(obj.getJsonObject("Monthly Time Series").getJsonObject(LAST_DAY_OF_MONTHS_2023[0]).getString("5. volume")));
        stockpricemonthly.closeArray.add(Float.parseFloat(obj.getJsonObject("Monthly Time Series").getJsonObject(LAST_DAY_OF_MONTHS_2023[1]).getString("4. close")));
        stockpricemonthly.volumeArray.add(Long.parseLong(obj.getJsonObject("Monthly Time Series").getJsonObject(LAST_DAY_OF_MONTHS_2023[1]).getString("5. volume")));
        stockpricemonthly.closeArray.add(Float.parseFloat(obj.getJsonObject("Monthly Time Series").getJsonObject(LAST_DAY_OF_MONTHS_2023[2]).getString("4. close")));
        stockpricemonthly.volumeArray.add(Long.parseLong(obj.getJsonObject("Monthly Time Series").getJsonObject(LAST_DAY_OF_MONTHS_2023[2]).getString("5. volume")));
        stockpricemonthly.closeArray.add(Float.parseFloat(obj.getJsonObject("Monthly Time Series").getJsonObject(LAST_DAY_OF_MONTHS_2023[3]).getString("4. close")));
        stockpricemonthly.volumeArray.add(Long.parseLong(obj.getJsonObject("Monthly Time Series").getJsonObject(LAST_DAY_OF_MONTHS_2023[3]).getString("5. volume")));
        return stockpricemonthly;
    }


}
