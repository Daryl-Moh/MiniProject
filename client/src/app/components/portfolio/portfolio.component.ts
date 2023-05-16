import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Stock } from 'src/app/models/stock';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  stocksList: string[] = []
  errorMsg!: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockSvc: StockService,
    private authSvc: AuthService,
    private router: Router) { }

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
}
      
  





