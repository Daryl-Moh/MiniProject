import { Component, Input, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { YahooStockService } from 'src/app/services/yahoo.stock.service';
import { YahooStocks } from 'src/app/models/yahoostock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMsg!: string
  stockSymbol: string[] = []
  stockQuantity: number[] = []
  stockPrice: number[] = []
  yahooStockList: YahooStocks[] = []
  param$!: Subscription;
  isLoggedIn: boolean = false

  constructor(
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
      this.yahooSvc.getStockPrice(s).then(data => {
        this.yahooStockList.push(data)
      })
    })

  }

  delete(index: number): void {
    this.stockSvc.removeFromPortfolio(this.authSvc.userID, this.stockSymbol[index])
      .catch((error: HttpErrorResponse) => {
        console.error(error.error)
      }).then(() => {
        this.stockSymbol.splice(index, 1)
        this.stockQuantity.splice(index, 1)
        this.yahooStockList.splice(index, 1)
        location.reload()
      })
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




