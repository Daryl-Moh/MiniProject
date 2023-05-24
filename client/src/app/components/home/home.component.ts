import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio';
import { StockService } from 'src/app/services/stock.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { error } from 'highcharts';
import { YahooStockService } from 'src/app/services/yahoo.stock.service';
import { YahooStocks } from 'src/app/models/yahoostock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMsg!: string
  //stocksList: string[] = []
  stockSymbol: string[] = []
  stockQuantity: number[] = []
  stockPrice: number[] = []
  yahooStockList: YahooStocks[] = []
  stockName = ""
  quantity = ""
  param$!: Subscription;
  isLoggedIn: boolean = false
    // testValue: any = [
    //   { name: 'IBM', y: 100},
    //   { name: 'TSLA', y: 200},
    //   { name: 'GOOGL', y: 300},
    //   { name: 'MSFT', y: 150},
    //   { name: 'AAPL', y: 500}]

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockSvc: StockService,
    private authSvc: AuthService,
    private router: Router,
    private yahooSvc: YahooStockService) { }

  ngOnInit(): void {
    this.checkLoggedIn()
    this.populateStockList()
    this.getStockPrices()
  }

  getStockPrices(): void {
    this.stockSymbol.forEach((s) => {
      console.log("this.stockSymbol >>> ", s)
      this.yahooSvc.getStockPrice(s).then(data => {
        this.yahooStockList.push(data)
        console.log("this.yahooStockList >>> ", this.yahooStockList)
      })
    })
    
  }

  delete(index: number): void {
    // console.log("stocklist before splice >>> " + this.stockSymbol)
    // console.log("stockQuantity before splice >>> " + this.stockQuantity)
    this.stockSvc.removeFromPortfolio(this.authSvc.userID, this.stockSymbol[index]).catch((error: HttpErrorResponse) => {
      console.error(error.error)
    }).then(() => {
      this.stockSymbol.splice(index, 1)
      this.stockQuantity.splice(index, 1)
      this.yahooStockList.splice(index, 1)
      location.reload()
    })
    //this.stocksList.splice(index, 1)
    
    // console.log("stocklist after splice >>> " + this.stockSymbol)
    // console.log("stockQuantity after splice >>> " + this.stockQuantity)
    // console.log("deleted stock name >>> " + this.stockSymbol[index])
    // console.log("deleted stock quantity >>> " + this.stockQuantity[index])
  }

  populateStockList(): void {
    this.stockSvc.getUserStocks(this.authSvc.userID).then(
      data => {
        data.portfolioStocks.forEach((p) => {
          this.stockSymbol.push(p.stockSymbol)
          this.stockQuantity.push(p.quantity)
        })
      }).then(() => {
        this.getStockPrices()
        }).catch((error: HttpErrorResponse) => {
        this.errorMsg = error.error
        console.log(error.error)
      })
    //this.stocksList = this.stockSymbol
  }

  checkLoggedIn(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn
    if (!this.authSvc.isLoggedIn) {
      window.alert("[ ACESS DENIED ] \n You are not logged in yet.")
      this.router.navigate(['/login']).then(() => {
        window.location.reload()
      })
    }
  }

}




