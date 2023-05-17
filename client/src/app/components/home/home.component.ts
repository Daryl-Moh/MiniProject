import { Component, Input } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio';
import { MatTableDataSource } from '@angular/material/table';
import { StockService } from 'src/app/services/stock.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { PortfolioStocks } from 'src/app/models/portfoliostocks';

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

  constructor(
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

  }

  delete(index: number): void {
    const updatedList: string[] = []
    console.log("deleted stock name >>> " + this.stocksList[index])
    this.stocksList.forEach((s) => {
      if (s != this.stocksList[index]) {
        console.log("pushing into updatedList >>> " + s)
        updatedList.push(s)
      }
    })
    this.stocksList = updatedList
    console.log("updated list >>> " + updatedList)
    console.log("stocksList >>> " + this.stocksList)

    const updatedSymbolList: string[] = []
    console.log("deleted stock name >>> " + this.stockSymbol[index])
    this.stockSymbol.forEach((s) => {
      if (s != this.stockSymbol[index]) {
        console.log("pushing into updatedList >>> " + s)
        updatedSymbolList.push(s)
      }
    })
    this.stockSymbol = updatedSymbolList
    console.log("updated list >>> " + updatedSymbolList)
    console.log("stockSymbol >>> " + this.stockSymbol)

    const updatedQuantityList: number[] = []
    console.log("deleted stock name >>> " + this.stockQuantity[index])
    this.stockQuantity.forEach((q) => {
      if (q != this.stockQuantity[index]) {
        console.log("pushing into updatedList >>> " + q)
        updatedQuantityList.push(q)
      }
    })
    this.stockQuantity = updatedQuantityList
    console.log("updated list >>> " + updatedQuantityList)
    console.log("stockQuantity >>> " + this.stockQuantity)

    const portfolioStocks: PortfolioStocks[] = [];

    for (let i = 0; i < this.stockSymbol.length; i++) {
      const stockSymbol = this.stockSymbol[i];
      const quantity = this.stockQuantity[i];

      const stock: PortfolioStocks = {
        stockSymbol: stockSymbol,
        quantity: quantity,
      };
      portfolioStocks.push(stock);
      console.log("portfolioStocks >>> " + portfolioStocks)
    }

    const portfolio: Portfolio = {
      userID: this.authSvc.userID,
      portfolioStocks: portfolioStocks,
    };
    console.log("portfolio >>> " + portfolio)
    this.stockSvc.updatePortfolio(portfolio).then(() => {
      this.router.navigate(['.']);
    }).catch((error: any) => {
      console.error('Error updating portfolio:', error);
    });

  }
}




