package com.tfip2223miniproject.server.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfip2223miniproject.server.models.Stock;
import com.tfip2223miniproject.server.models.StockOverview;
import com.tfip2223miniproject.server.services.StockService;
import com.tfip2223miniproject.server.utils.Utils;

import io.jsonwebtoken.io.IOException;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(path="/api/data", produces=MediaType.APPLICATION_JSON_VALUE)
public class DataController {

    @Autowired StockService stockSvc;
    
    @GetMapping(path="/search/{stockName}")
    public ResponseEntity<String> searchByStockName(
        @RequestHeader(name = "Authorization") String token,
        @PathVariable(required=true) String stockName) throws IOException {

            JsonArray result = null;
            Optional<List<Stock>> optListStock = this.stockSvc.getStocks(stockName);
            List<Stock> results = optListStock.get();
            JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
            for(Stock s : results)
                arrBuilder.add(Utils.toJSON(s));
            result = arrBuilder.build();
            System.out.println("searching stock name >>>" + stockName);
            return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result.toString());
        }

    @GetMapping(path="/overview/{stockName}")
    public ResponseEntity<String> getStockOverview(
        @RequestHeader(name = "Authorization") String token,
        @PathVariable(required=true) String stockName) throws IOException {
            
            JsonArray result = null;
            Optional<StockOverview> optListStock = this.stockSvc.getStockOverview(stockName);
            StockOverview results = optListStock.get();
            JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
                arrBuilder.add(Utils.toJSON(results));
            result = arrBuilder.build();
            System.out.println("searching stock overview by name >>>" + stockName);
            return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result.toString());


        }
    
}
