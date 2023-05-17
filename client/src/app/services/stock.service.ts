import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, tap } from "rxjs";
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
        private authSvc: AuthService) { }

    getStocks(stockName: string): Promise<any> {
        const params = new HttpParams()
            .set("stockName", stockName);

        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[getStocks] >>> params = ' + this.authSvc.JWT);
        console.log('[getStocks] >>> params = ' + params);
        console.log('[getStocks] >>> headers = ' + headers);

        return lastValueFrom(this.httpClient
            .get<Stock[]>(this.API_URI + "/search", { params: params, headers: headers }));
    }

    getStockOverview(stockName: string): Promise<any> {
        const params = new HttpParams()
            .set("stockName", stockName.trim());

        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[getStockOverview] >>> jwt = ' + this.authSvc.JWT);
        console.log('[getStockOverview] >>> params = ' + params);
        console.log('[getStockOverview] >>> headers = ' + headers);

        return lastValueFrom(this.httpClient
            .get<StockOverview>(this.API_URI + "/overview", { params: params, headers: headers }));
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
        console.log('[getUserStocks] >>> jwt = ' + this.authSvc.JWT);
        console.log('[getUserStocks] >>> params = ' + params);
        console.log('[getUserStocks] >>> headers = ' + headers);

        return lastValueFrom(this.httpClient
            .get<Portfolio>(this.API_URI + "/retrieve", { params: params, headers: headers }));
    }

    savePortfolio(p: Portfolio): Promise<any> {
        const params = new HttpParams()
            .set("userID", p.userID.trim());
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        const body = JSON.stringify(p);
        console.log('[saveStockSymbol] >>> jwt = ' + this.authSvc.JWT);
        console.log('[saveStockSymbol] >>> params = ' + params);
        console.log('[saveStockSymbol] >>> headers = ' + headers);
        return lastValueFrom(this.httpClient
            .post<Portfolio>(this.API_URI + "/save" + p.userID, { params: params, headers: headers }));
    }

    updatePortfolio(p: Portfolio): Promise<any> {
        const params = new HttpParams()
            .set("userID", this.authSvc.userID.trim());
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[saveStockSymbol] >>> jwt = ' + this.authSvc.JWT);
        console.log('[saveStockSymbol] >>> params = ' + params);
        console.log('[saveStockSymbol] >>> headers = ' + headers);
        return lastValueFrom(this.httpClient
            .put<Portfolio>(this.API_URI + "/update", p, { params: params, headers: headers }));
    }
}