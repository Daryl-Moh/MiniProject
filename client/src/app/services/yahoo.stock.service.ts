import { HttpParams, HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, catchError } from "rxjs";
import { StockOverview } from "../models/stockoverview";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class YahooStockService {

    private API_URI: string = "/api/yahoo";

    constructor(
        private httpClient: HttpClient,
        private authSvc: AuthService) {}

    getStockPrice(stockName: string): Promise<any> {
        const params = new HttpParams()
            .set("stockName", stockName.trim());

        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[getStockPrice] >>> jwt = ' + this.authSvc.JWT);
        console.log('[getStockPrice] >>> params = ' + params);
        console.log('[getStockPrice] >>> headers = ' + headers);

        const url = `${this.API_URI}/overview?${params.toString()}`;
        console.log('[getStockPrice] >>> url = ', url);

        return lastValueFrom(this.httpClient
            .get<StockOverview>(this.API_URI + "/getprices", { params: params, headers: headers }));
    }
}