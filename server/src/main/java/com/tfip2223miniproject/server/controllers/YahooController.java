package com.tfip2223miniproject.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tfip2223miniproject.server.models.YahooStock;
import com.tfip2223miniproject.server.repositories.YahooStockRepository;
import com.tfip2223miniproject.server.services.YahooStockService;

import io.jsonwebtoken.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/yahoo", produces = MediaType.APPLICATION_JSON_VALUE)
public class YahooController {

    @Autowired
    YahooStockService yahooStockSvc;

    @Autowired
    YahooStockRepository yahooStockRepo;

    // Subscribed to the API but the next day the server side had error
    // and refused the endpoints that was crucial to my app. 
    // Solution was to hardcode all the data in the db and use it as 
    // a restapi endpoint to get stock prices. (stocks API expensive) 

    // @GetMapping(path = "/getprices")
    // public ResponseEntity<String> getStockPrices(
    //         @RequestHeader(name = "Authorization") String token,
    //         @RequestParam(required = true) String stockName) throws IOException {

    //     Optional<YahooStock> optYahooStock = this.yahooStockSvc.getStockPrice(stockName);
    //     YahooStock results = optYahooStock.get();
    //     System.out.println("searching yahoo stock by name >>>" + stockName);
    //     return ResponseEntity
    //             .status(HttpStatus.OK)
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .body(Utils.toJSON(results).toString());
    // }

    @GetMapping(path = "/getprices")
    public ResponseEntity<YahooStock> getStockPricesBackup(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(required = true) String stockName) throws IOException {

        System.out.println("hitting GetMapping stockName >>> " + stockName);    

        List<YahooStock> optYahooStock = this.yahooStockRepo.getStockPrice(stockName);

        System.out.println("optYahooStock >>> " + optYahooStock.toString());

        YahooStock result = optYahooStock.get(0);

        System.out.println("searching yahoo stock by name >>>" + stockName);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result);
    }
}

