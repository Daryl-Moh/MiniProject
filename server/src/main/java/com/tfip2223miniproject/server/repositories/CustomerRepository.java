package com.tfip2223miniproject.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.tfip2223miniproject.server.models.Portfolio;

import static com.tfip2223miniproject.server.Constants.*;

@Repository
public class CustomerRepository {
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public Portfolio insertPortfolio(Portfolio p) {
        return mongoTemplate.insert(p, PORTFOLIO_COL);
    }
}
