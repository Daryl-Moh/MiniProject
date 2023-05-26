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
        Criteria criterial = Criteria.where(STOCK_SYMBOL).is(stockName);
        Query query = Query.query(criterial);
        List<YahooStock> result = mongoTemplate.find(query, YahooStock.class, STOCKINFO_COL);
        return result;
    }
    
}
