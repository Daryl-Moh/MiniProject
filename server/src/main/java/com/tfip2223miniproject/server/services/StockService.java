package com.tfip2223miniproject.server.services;

import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.tfip2223miniproject.server.models.Portfolio;
import com.tfip2223miniproject.server.models.Stock;
import com.tfip2223miniproject.server.models.StockGlobalQuote;
import com.tfip2223miniproject.server.models.StockOverview;
import com.tfip2223miniproject.server.models.StockPriceMonthly;
import com.tfip2223miniproject.server.repositories.CustomerRepository;
import com.tfip2223miniproject.server.utils.Utils;

import io.jsonwebtoken.io.IOException;

@Service
public class StockService {

    @Autowired
    private CustomerRepository custRepo;

    @Value("${miniproj.stock.api.url}")
    private String stockApiUrl;

    @Value("${miniproj.stock.api.key}")
    private String stockApiKey;

    public Optional<List<Stock>> getStocks(String stockName) throws IOException {

        ResponseEntity<String> resp = null;
        Optional<List<Stock>> listOfStocks = null;

        // System.out.println("stockApiUrl >>> " + stockApiUrl);
        // System.out.println("stockApiKey >>> " + stockApiKey);

        String stockListApiUrl = UriComponentsBuilder
                .fromUriString(stockApiUrl)
                .queryParam("function", "SYMBOL_SEARCH")
                .queryParam("keywords", stockName.replaceAll(" ", "+"))
                .queryParam("apikey", stockApiKey.trim())
                .toUriString();

        // System.out.println("stockApiUrl >>> " + stockListApiUrl);

        RestTemplate template = new RestTemplate();

        resp = template.getForEntity(stockListApiUrl, String.class);

        // System.out.println("Response Body >>> " + resp);

        try {
            listOfStocks = Utils.createListOfStocks(resp.getBody());
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }

        return listOfStocks;
    }

    public Optional<StockOverview> getStockOverview (String stockName) throws IOException {

        ResponseEntity<String> resp = null;
        Optional<StockOverview> stkovr = null;

        System.out.println("stockApiUrl >>> " + stockApiUrl);
        System.out.println("stockApiKey >>> " + stockApiKey);

        String stockOverviewApiUrl = UriComponentsBuilder
                .fromUriString(stockApiUrl)
                .queryParam("function", "OVERVIEW")
                .queryParam("symbol", stockName.replaceAll(" ", "+"))
                .queryParam("apikey", stockApiKey.trim())
                .toUriString();

        System.out.println("stockOverviewApiUrl >>> " + stockOverviewApiUrl);

        RestTemplate template = new RestTemplate();

        resp = template.getForEntity(stockOverviewApiUrl, String.class);

        System.out.println("Response Body >>> " + resp);

        try {
            stkovr = Utils.createStockOverview(resp.getBody());
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
        
        return stkovr;
    }

    public Optional<StockGlobalQuote> getStockGlobalQuote(String stockName) throws IOException { 
        ResponseEntity<String> resp = null;
        Optional<StockGlobalQuote> stockglobalquote = null;
        String stockGlobalQuoteApiUrl = UriComponentsBuilder
                .fromUriString(stockApiUrl)
                .queryParam("function", "GLOBAL_QUOTE")
                .queryParam("symbol", stockName.replaceAll(" ", "+"))
                .queryParam("apikey", stockApiKey.trim())
                .toUriString();

        System.out.println("stockGlobalQuoteApiUrl >>> " + stockGlobalQuoteApiUrl);

        RestTemplate template = new RestTemplate();

        resp = template.getForEntity(stockGlobalQuoteApiUrl, String.class);

        System.out.println("Response Body >>> " + resp);

        try {
            stockglobalquote = Utils.createStockGlobalQuote(resp.getBody());
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }

        return stockglobalquote;
    }

    public Optional<StockPriceMonthly> getStockPriceMonthly(String stockName) throws IOException { 
        ResponseEntity<String> resp = null;
        Optional<StockPriceMonthly> stockpricemonthly = null;
        String stockPriceMonthlyApiUrl = UriComponentsBuilder
                .fromUriString(stockApiUrl)
                .queryParam("function", "TIME_SERIES_MONTHLY")
                .queryParam("symbol", stockName.replaceAll(" ", "+"))
                .queryParam("apikey", stockApiKey.trim())
                .toUriString();

        System.out.println("stockPriceMonthlyApiUrl >>> " + stockPriceMonthlyApiUrl);

        RestTemplate template = new RestTemplate();

        resp = template.getForEntity(stockPriceMonthlyApiUrl, String.class);

        System.out.println("Response Body >>> " + resp);

        try {
            stockpricemonthly = Utils.createPriceMonthly(resp.getBody());
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
        
        return stockpricemonthly;
    }

    public void insertPortfolio(Portfolio p){
        custRepo.insertPortfolio(p);
    }

    public List<Document> getUserStocks(String userID){
        return custRepo.getUserStocks(userID);
    }

    public Boolean updatePortfolio(Portfolio p) {
        return custRepo.updatePortfolio(p);
        
    }

}
