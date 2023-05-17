import { Component } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio';
import {MatTableDataSource} from '@angular/material/table';
import { StockService } from 'src/app/services/stock.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  errorMsg!: string
  stocksList: string [] = []
  

  constructor(
    private stockSvc: StockService,
    private authSvc: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.stockSvc.getUserStocks(this.authSvc.userID).then(
      data => {
        this.stocksList = data.stockSymbols;
        console.log("stocksList >>> " + this.stocksList)
      }
    ).catch((error : HttpErrorResponse) => {
        this.errorMsg = error.error
        console.log(error.error)
    })
    
  }

  delete(index: number): void {
    const updatedList: string [] = []
    console.log("deleted stock name >>> " + this.stocksList[index])
    this.stocksList.forEach((s) => {
      if (s != this.stocksList[index]){
        console.log("pushing into updatedList >>> " + s)
        updatedList.push(s)
      }
    })
    this.stocksList=updatedList
    console.log("updated list >>> " + updatedList)
    console.log("stocksList >>> " + this.stocksList)
    //this.stockSvc.removeStock(this.stocksList[index])
  }
}

