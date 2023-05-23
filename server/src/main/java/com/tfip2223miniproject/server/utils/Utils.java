package com.tfip2223miniproject.server.utils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import com.tfip2223miniproject.server.models.Stock;
import com.tfip2223miniproject.server.models.StockGlobalQuote;
import com.tfip2223miniproject.server.models.StockOverview;
import com.tfip2223miniproject.server.models.StockPriceMonthly;
import com.tfip2223miniproject.server.models.User;
import com.tfip2223miniproject.server.models.YahooStock;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue;

public class Utils {
    
    public static JsonObjectBuilder userToJOB(User u) {
        JsonObjectBuilder job = Json.createObjectBuilder()
                .add("email", u.getEmail())
                .add("givenname", u.getGivenname())
                .add("familyname", u.getFamilyname());
        return job;
    }

    public static JsonArrayBuilder userListToJAB(List<User> userList) {
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (User u : userList) {
            jab.add(userToJOB(u));
        }
        return jab;
    }

    public static JsonObject toJSON(Stock s) {
        JsonObject JsonObj = Json.createObjectBuilder()
            .add("symbol", s.getSymbol())
            .add("name", s.getName())
            .add("type", s.getType())
            .add("region", s.getRegion())
            .add("currency", s.getCurrency())
            .build();
        return JsonObj;
    }

    public static JsonObject toJSON(YahooStock s) {
        JsonObject JsonObj = Json.createObjectBuilder()
            .add("symbol", s.getSymbol())
            .add("currency", s.getCurrency())
            .add("ask", s.getAsk())
            .add("trailingAnnualDividendRate", s.getTrailingAnnualDividendRate())
            .add("trailingAnnualDividendYield", s.getTrailingAnnualDividendYield())
            .build();
        return JsonObj;
    }

    public static String toJSON(String s) {
        JsonObject JsonObj = Json.createObjectBuilder()
            .add("response", s)
            .build();
        return JsonObj.toString();
    }

    public static JsonObject toJSON(StockOverview so) {
        JsonObject JsonObj = Json.createObjectBuilder()
            .add("symbol", so.getSymbol())
            .add("name", so.getName())
            .add("description", so.getDescription())
            .add("exchange", so.getExchange())
            .add("country", so.getCountry())
            .add("sector", so.getSector())
            .add("industry", so.getIndustry())
            .add("marketCap", so.getMarketCap())
            .add("dividendPerShare", so.getDividendPerShare())
            .add("dividendYield", so.getDividendYield())
            .add("fiftyTwoWeekHigh", so.getFiftyTwoWeekHigh())
            .add("fiftyTwoWeekLow", so.getFiftyTwoWeekLow())
            .add("sharesOutstanding", so.getSharesOutstanding())
            .build();

        return JsonObj;
    }

    public static JsonObject toJSON(StockGlobalQuote sgq) {
        JsonObject JsonObj = Json.createObjectBuilder()
            .add("symbol", sgq.getSymbol())
            .add("price", sgq.getPrice())
            .add("latest trading day", sgq.getLatestTradingDay())
            .add("change", sgq.getChange())
            .add("change percentage", sgq.getChangePercent())
            .build();
        return JsonObj;
    }

    public static JsonObject toJSON(StockPriceMonthly spm) {

        JsonArray resultClose = null;
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

        for(Float c : spm.getCloseArray())
            arrayBuilder.add(c);

        resultClose = arrayBuilder.build();

        JsonArray resultVolume = null;
        JsonArrayBuilder arrayBuilder2 = Json.createArrayBuilder();
     
        for(Long v : spm.getVolumeArray())
            arrayBuilder2.add(v);

        resultVolume = arrayBuilder2.build();    

        JsonObject JsonObj = Json.createObjectBuilder()
            .add("symbol", spm.getSymbol())
            .add("prices", resultClose)
            .add("volumes", resultVolume)
            .build();
        return JsonObj;
    }


    public static Optional<List<Stock>> createListOfStocks (String json) throws IOException {
        List<Stock> stockList = new LinkedList<>();

        try (InputStream is = new ByteArrayInputStream(json.getBytes())) {
            JsonReader r = Json.createReader(is);
            JsonObject obj = r.readObject();

            stockList = obj.getJsonArray("bestMatches").stream()
                .map(JsonValue::asJsonObject)
                .map(Stock::create)
                .toList();


        } catch (IOException e) {
            e.printStackTrace();
        }

        if(stockList != null)
            return Optional.of(stockList);
        return Optional.empty();
    }

    public static Optional<StockOverview> createStockOverview (String json) throws IOException {
        StockOverview stkovr = new StockOverview();

        try (InputStream is = new ByteArrayInputStream(json.getBytes())) {
            JsonReader r = Json.createReader(is);
            JsonObject obj = r.readObject();

            stkovr = stkovr.create(obj.asJsonObject());

        } catch (IOException e) {
            e.printStackTrace();
        }

        if(stkovr != null)
            return Optional.of(stkovr);
        return Optional.empty();
    }

    public static Optional<StockGlobalQuote> createStockGlobalQuote (String json) throws IOException {
        StockGlobalQuote stockglobalquote = new StockGlobalQuote();

        try (InputStream is = new ByteArrayInputStream(json.getBytes())) {
            JsonReader r = Json.createReader(is);
            JsonObject obj = r.readObject();

            stockglobalquote = stockglobalquote.create(obj.asJsonObject());

        } catch (IOException e) {
            e.printStackTrace();
        }

        if(stockglobalquote != null)
            return Optional.of(stockglobalquote);
        return Optional.empty();
    }

    public static Optional<StockPriceMonthly> createPriceMonthly (String json) throws IOException {
        StockPriceMonthly stockpricemonthly = new StockPriceMonthly();

        try (InputStream is = new ByteArrayInputStream(json.getBytes())) {
            JsonReader r = Json.createReader(is);
            JsonObject obj = r.readObject();

            stockpricemonthly = stockpricemonthly.create(obj.asJsonObject());

        } catch (IOException e) {
            e.printStackTrace();
        }

        if(stockpricemonthly != null)
            return Optional.of(stockpricemonthly);
        return Optional.empty();
    }

    public static Optional<YahooStock> createYahooStock (String json) throws IOException {
        
        System.out.println("hitting Utils createYahooStock >>> " + json);

        YahooStock ystk = new YahooStock();

        try (InputStream is = new ByteArrayInputStream(json.getBytes())) {
            JsonReader r = Json.createReader(is);
            JsonObject obj = r.readArray().getJsonObject(0);

            ystk = ystk.create(obj);

        } catch (IOException e) {
            e.printStackTrace();
        }

        if(ystk != null)
            return Optional.of(ystk);
        return Optional.empty();
    }


}
