import { Component, Input } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio';
import { MatTableDataSource } from '@angular/material/table';
import { StockService } from 'src/app/services/stock.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { PortfolioStocks } from 'src/app/models/portfoliostocks';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  errorMsg!: string
  stocksList: string[] = []
  stockSymbol: string[] = []
  stockQuantity: number[] = []
  stockPrice: number[] = []
  stockName = ""
  quantity = ""
  param$!: Subscription;
  tempStockList: Portfolio[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockSvc: StockService,
    private authSvc: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.stockSvc.getUserStocks(this.authSvc.userID).then(
      data => {
        data.portfolioStocks.forEach((p) => {
          this.stockSymbol.push(p.stockSymbol)
          this.stockQuantity.push(p.quantity)
        })
      }).catch((error: HttpErrorResponse) => {
        this.errorMsg = error.error
        console.log(error.error)
      })
    this.stocksList = this.stockSymbol
    this.tempStockList = this.stockSvc.showStockList()
    console.log("tempStockList >>> ", this.tempStockList)
  }

  delete(index: number): void {
    this.stockSvc.removeFromPortfolio(this.authSvc.userID, this.stocksList[index])
    console.log("deleted stock name >>> " + this.stocksList[index])
      window.location.reload()
    }
 
}




