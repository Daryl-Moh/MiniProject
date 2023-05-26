import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, lastValueFrom, map, tap } from "rxjs";
import { Stock } from "../models/stock";
import { AuthService } from "./auth.service";
import { StockOverview } from "../models/stockoverview";
import { StockPriceMonthly } from "../models/stockpricemonthly";
import { Portfolio } from "../models/portfolio";

@Injectable({
    providedIn: 'root'
})
export class StockService {

    private API_URI: string = "/api/data";

    constructor(
        private httpClient: HttpClient,
        private authSvc: AuthService) {}

    getStocks(stockName: string): Promise<any> {
        const params = new HttpParams()
            .set("stockName", stockName);
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        return lastValueFrom(this.httpClient
            .get<Stock[]>(this.API_URI + "/search", { params: params, headers: headers })
            .pipe(
                catchError((error) => {
                  console.error('An error occurred:', error);
                  throw new Error('The stock you are looking for is unavailable');
                })
              ));
    }

    getStockOverview(stockName: string): Promise<any> {
        const params = new HttpParams()
            .set("stockName", stockName.trim());

        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[getStockOverview] >>> jwt = ' + this.authSvc.JWT);
        console.log('[getStockOverview] >>> params = ' + params);
        console.log('[getStockOverview] >>> headers = ' + headers);

        const url = `${this.API_URI}/overview?${params.toString()}`;
        console.log('[getStockOverview] >>> url = ', url);

        return lastValueFrom(this.httpClient
            .get<StockOverview>(this.API_URI + "/overview", { params: params, headers: headers })
            .pipe(
                catchError((error) => {
                  console.error('An error occurred:', error);
                  throw new Error('The stock you are looking for is unavailable');
                })
        ));
    }

    getStockPriceMonthly(stockName: string): Promise<StockPriceMonthly> {
        const params = new HttpParams()
            .set("stockName", stockName.trim());

        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[getStockPriceMonthly] >>> jwt = ' + this.authSvc.JWT);
        console.log('[getStockPriceMonthly] >>> params = ' + params);
        console.log('[getStockPriceMonthly] >>> headers = ' + headers);

        return lastValueFrom(this.httpClient
            .get<StockPriceMonthly>(this.API_URI + "/pricemonthly", { params: params, headers: headers }));

    }

    getUserStocks(userID: string): Promise<Portfolio> {
        const params = new HttpParams()
            .set("userID", userID.trim());
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);

        return lastValueFrom(this.httpClient
            .get<Portfolio>(this.API_URI + "/retrieve", { params: params, headers: headers }));
    }

    savePortfolio(userID: String): Promise<any> {
        const params = new HttpParams()
            .set("userID", userID.trim());
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[savePortfolio] >>> jwt = ' + this.authSvc.JWT);
        console.log('[savePortfolio] >>> params = ' + params);
        console.log('[savePortfolio] >>> headers = ' + headers);
        
        return lastValueFrom(this.httpClient
            .post<String>(this.API_URI + "/save", null, { params: params, headers: headers }));
    }

    updatePortfolio(p: Portfolio): Promise<any> {
        const params = new HttpParams()
            .set("userID", this.authSvc.userID.trim());
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[updatePortfolio] >>> jwt = ' + this.authSvc.JWT);
        console.log('[updatePortfolio] >>> params = ' + params);
        console.log('[updatePortfolio] >>> headers = ' + headers);

        const url = `${this.API_URI}/update?${params.toString()}`;
        console.log('[updatePortfolio] >>> url = ', url);

        return lastValueFrom(this.httpClient
            .put<Portfolio>(this.API_URI + "/update", p, { params: params, headers: headers }));
    }

    addToPortfolio(userID: string, stockName: string, quantity: number): Promise<any> {
        const params = new HttpParams()
            .set("userID", userID)
            .set("stockSymbol", stockName)
            .set("quantity", quantity);
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        
        console.log('[addToPortfolio] >>> jwt = ' + this.authSvc.JWT);
        console.log('[addToPortfolio] >>> userID = ' + userID);
        console.log('[addToPortfolio] >>> params = ' + params);
        console.log('[addToPortfolio] >>> headers = ', headers);

        const url = `${this.API_URI}/addstocktoportfolio?${params.toString()}`;
        console.log('[addToPortfolio] >>> url = ', url);

        return lastValueFrom(this.httpClient
            .put<String>(this.API_URI + "/addstocktoportfolio", null, { params: params, headers: headers}));
    }

    removeFromPortfolio(userID: string, stockName: string): Promise<any> {
        let params = new HttpParams()
            .set("userID", userID)
            .set("stockSymbol", stockName);
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[addToPortfolio] >>> jwt = ' + this.authSvc.JWT);
        console.log('[addToPortfolio] >>> userID = ' + userID);
        console.log('[addToPortfolio] >>> params = ' + params);
        console.log('[addToPortfolio] >>> headers = ', headers);

        const url = `${this.API_URI}/removestockfromportfolio?${params.toString()}`;
        console.log('[addToPortfolio] >>> url = ', url);

        return lastValueFrom(this.httpClient
            .put<any>(this.API_URI + "/removestockfromportfolio", null,  { params: params, headers: headers }));
    }
}