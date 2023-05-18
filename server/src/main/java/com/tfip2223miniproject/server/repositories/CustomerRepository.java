package com.tfip2223miniproject.server.repositories;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.UpdateResult;
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

    public Boolean updatePortfolio(Portfolio p) {
        Query query = new Query(Criteria.where(USER_ID).is(p.getUserID()));
        Update update = new Update().set("portfolioStocks", p.getPortfolioStocks());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Portfolio.class);
        Long modifiedRows = updateResult.getModifiedCount();
        if (modifiedRows != 1) {
            return false;
        }
        return true;
    }

    public Boolean addStockToPortfolio(Portfolio p) {
        Query query = new Query(Criteria.where(USER_ID).is(p.getUserID()));
        Update update = new Update().push("portfolioStocks", p.getPortfolioStocks().get(0));
        System.out.println("p.getPortfolioStocks() >>> " + p.getPortfolioStocks());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Portfolio.class);
        Long modifiedRows = updateResult.getModifiedCount();
        System.out.println("updateResult >>> " + updateResult);
        if (modifiedRows != 1) {
            return false;
        }
        return true;
    }
}
