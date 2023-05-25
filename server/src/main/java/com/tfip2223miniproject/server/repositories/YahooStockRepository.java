package com.tfip2223miniproject.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.tfip2223miniproject.server.models.YahooStock;

import static com.tfip2223miniproject.server.Constants.*;

import java.util.List;

@Repository
public class YahooStockRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<YahooStock> getStockPrice(String stockName) {

        System.out.println("hitting YahooStockRepo stockName >>> " + stockName);

        Criteria criterial = Criteria.where(STOCK_SYMBOL).is(stockName);
        Query query = Query.query(criterial);

        System.out.println("hitting YahooStockRepo criterial >>> " + criterial);
        System.out.println("hitting YahooStockRepo query >>> " + query);

        List<YahooStock> result = mongoTemplate.find(query, YahooStock.class, STOCKINFO_COL);

        System.out.println("hitting YahooStockRepo result >>> " + result);

        return result;
    }
    
}
