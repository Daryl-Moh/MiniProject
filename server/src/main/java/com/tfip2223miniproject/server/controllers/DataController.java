package com.tfip2223miniproject.server.controllers;

import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Utils.toJSON(results).toString());

    }

    @PostMapping(path = "/save")
    public ResponseEntity<String> saveUserPortfolio(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(required = true) String userID) {

        List<Document> result = this.stockSvc.getUserStocks(userID);
        if (result.isEmpty()) {
            Portfolio p1 = new Portfolio();
            p1.setUserID(userID);
            p1.setPortfolioStocks(null);
            this.stockSvc.insertPortfolio(p1);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("Portfolio Insertion Success!");
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("Portfolio Insertion Failed! Portfolio already exists");
        }
    }

    @GetMapping(path = "/retrieve")
    public ResponseEntity<String> getUserStocks(
            @RequestParam(required = true) String userID) {
        List<Document> results = this.stockSvc.getUserStocks(userID);
        if (results.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("User Does Not Exist");
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(results.get(0).toJson().toString());

        }
    }

    @PutMapping(path = "/update")
    public ResponseEntity<String> updateUserStocks(
            @RequestBody Portfolio portfolio,
            @RequestParam(required = true) String userID) {

        Portfolio p1 = new Portfolio();
        p1.setUserID(userID);
        p1.setPortfolioStocks(portfolio.getPortfolioStocks());
        Boolean result = this.stockSvc.updatePortfolio(p1);
        if (result == true) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("Portfolio Update Success!");
        } else {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("Portfolio Update Failed!");
        }
    }

    @PutMapping(path = "/addstocktoportfolio")
    public ResponseEntity<String> addStockToPortfolio(
            @RequestParam(required = true) String userID,
            @RequestParam(required = true) String stockSymbol,
            @RequestParam(required = true) Integer quantity) {

        Boolean result = this.stockSvc.addStockToPortfolio(userID, stockSymbol, quantity);
        if (result == true) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Utils.toJSON("Add Stock to Portfolio Success!"));
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Utils.toJSON("Add Stock to Portfolio Failed!"));
        }
    }

    @PutMapping(path = "/removestockfromportfolio")
    public ResponseEntity<String> removeStockFromPortfolio(
            @RequestParam(required = true) String userID,
            @RequestParam(required = true) String stockSymbol) {

        Boolean result = this.stockSvc.removeStockFromPortfolio(userID, stockSymbol);
        if (result == true) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Utils.toJSON("Remove Stock from Portfolio Success!"));
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Utils.toJSON("Remove Stock from Portfolio Failed!"));
        }
    }
}
