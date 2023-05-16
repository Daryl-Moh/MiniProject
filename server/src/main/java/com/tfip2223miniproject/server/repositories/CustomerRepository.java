package com.tfip2223miniproject.server.repositories;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.tfip2223miniproject.server.models.Portfolio;

import static com.tfip2223miniproject.server.Constants.*;

import java.util.List;

@Repository
public class CustomerRepository {
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public void insertPortfolio(Portfolio p) {
        mongoTemplate.insert(p, PORTFOLIO_COL);
    }


    public List<Document> getUserStocks(String userID) {
        
        Criteria criterial = Criteria.where(USER_ID).regex(userID, "i");
        Query query = Query.query(criterial);

        List<Document> result = mongoTemplate.find(query, Document.class, PORTFOLIO_COL);
        
        return result;
    }
}
