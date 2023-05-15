import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Stock } from "../models/stock";
import { AuthService } from "./auth.service";
import { StockOverview } from "../models/stockoverview";

@Injectable({
    providedIn: 'root'
})
export class StockService {

    private API_URI: string = "/api/data";
  
    constructor(
        private httpClient: HttpClient,
        private authSvc: AuthService) { }
  
    getStocks(stockName: string): Promise<any>{
      const params = new HttpParams()
          .set("stockName", stockName);
  
      const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
      console.log('[getStocks] >>> params = ' + this.authSvc.JWT);
      console.log('[getStocks] >>> params = ' + params);
      console.log('[getStocks] >>> headers = ' + headers);
    
      return lastValueFrom(this.httpClient
          .get<Stock[]>(this.API_URI + "/search", {params: params, headers: headers}));
    }

    getStockOverview(stockName: string): Promise<any>{
        const params = new HttpParams()
            .set("stockName", stockName.trim());
    
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[getStocks] >>> jwt = ' + this.authSvc.JWT);
        console.log('[getStocks] >>> params = ' + params);
        console.log('[getStocks] >>> headers = ' + headers);
      
        return lastValueFrom(this.httpClient
            .get<StockOverview>(this.API_URI + "/overview", {params: params, headers: headers}));
      }

}