package com.tfip2223miniproject.server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.tfip2223miniproject.server.models.YahooStock;
import com.tfip2223miniproject.server.utils.Utils;

import io.jsonwebtoken.io.IOException;

@Service
public class YahooStockService {

    @Value("${miniproj.yahoostock.api.url}")
    private String yahooApiUrl;

    @Value("${miniproj.yahoostock.api.key}")
    private String yahooApiKey;

    @Value("${miniproj.yahoostock.api.host}")
    private String yahooApiHost;

    public Optional<YahooStock> getStockPrice(String symbol) throws IOException {
        
        ResponseEntity<String> response = null;
        Optional<YahooStock> ystk = null;

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", yahooApiKey);
        headers.set("X-RapidAPI-Host", yahooApiHost);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String apiUrl = yahooApiUrl + "/" + symbol;

        System.out.println("yahooApiUrl >>> " + yahooApiUrl);
        System.out.println("yahooApiKey >>> " + yahooApiKey);
        System.out.println("yahooApiHost >>> " + yahooApiHost);
        System.out.println("entity >>> " + entity);
        System.out.println("apiUrl >>> " + apiUrl);

        RestTemplate template = new RestTemplate();

        response = template.exchange(apiUrl, HttpMethod.GET, entity, String.class, headers);

        System.out.println("response >>> " + response);

        try {
                ystk = Utils.createYahooStock(response.getBody());
                
            } catch (java.io.IOException e) {
                e.printStackTrace();
    
            }
            return ystk;
        }
        
}
