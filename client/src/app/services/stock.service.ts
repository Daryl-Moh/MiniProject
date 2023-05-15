import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Stock } from "../models/stock";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class StockService {

    private API_URI: string = "/api/data/search";
  
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
          .get<Stock[]>(this.API_URI, {params: params, headers: headers}));
    }

}