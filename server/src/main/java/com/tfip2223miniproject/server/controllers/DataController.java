package com.tfip2223miniproject.server.controllers;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tfip2223miniproject.server.models.Portfolio;
import com.tfip2223miniproject.server.models.Stock;
import com.tfip2223miniproject.server.models.StockGlobalQuote;
import com.tfip2223miniproject.server.models.StockOverview;
import com.tfip2223miniproject.server.models.StockPriceMonthly;
import com.tfip2223miniproject.server.services.StockService;
import com.tfip2223miniproject.server.utils.Utils;

import io.jsonwebtoken.io.IOException;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/data", produces = MediaType.APPLICATION_JSON_VALUE)
public class DataController {

    private Logger logger = LoggerFactory.getLogger(DataController.class);

    @Autowired
    StockService stockSvc;

    @GetMapping(path = "/search")
    public ResponseEntity<String> searchByStockName(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(required = true) String stockName) throws IOException {

        JsonArray result = null;
        Optional<List<Stock>> optListStock = this.stockSvc.getStocks(stockName);
        List<Stock> results = optListStock.get();
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (Stock s : results)
            arrBuilder.add(Utils.toJSON(s));
        result = arrBuilder.build();
        System.out.println("searching stock name >>>" + stockName);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result.toString());
    }

    @GetMapping(path = "/overview")
    public ResponseEntity<String> getStockOverview(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(required = true) String stockName) throws IOException {

        Optional<StockOverview> optStockOverview = this.stockSvc.getStockOverview(stockName);
        StockOverview results = optStockOverview.get();
        System.out.println("searching stock overview by name >>>" + stockName);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Utils.toJSON(results).toString());

    }

    @GetMapping(path = "/globalquote")
    public ResponseEntity<String> getGlobalQuote(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(required = true) String stockName) throws IOException {

        Optional<StockGlobalQuote> optStockGlobalQuote = this.stockSvc.getStockGlobalQuote(stockName);
        StockGlobalQuote results = optStockGlobalQuote.get();
        System.out.println("searching stock global quote by name >>>" + stockName);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Utils.toJSON(results).toString());

    }

    @GetMapping(path = "/pricemonthly")
    public ResponseEntity<String> getPriceMonthly(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(required = true) String stockName) throws IOException {

        Optional<StockPriceMonthly> optStockPriceMonthly = this.stockSvc.getStockPriceMonthly(stockName);
        StockPriceMonthly results = optStockPriceMonthly.get();
        System.out.println("searching stock global quote by name >>>" + stockName);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Utils.toJSON(results).toString());

    }

    // @PostMapping(path="/save/{userID}")
    // public ResponseEntity<String> saveUserPortfolio (
    //     @RequestBody Portfolio comment, @PathVariable(required=true) String userID) {
    //     logger.info("save portfolio > : " + userID);
    //     Portfolio c= new Portfolio();
    //     c.setComment(comment.getComment());
    //     c.setCharId(charId);
    //     Portfolio r = this.charSvc.insertComment(c);
    //     return ResponseEntity
    //         .status(HttpStatus.OK)
    //         .contentType(MediaType.APPLICATION_JSON)
    //         .body(r.toJSON().toString());
    // }

}
