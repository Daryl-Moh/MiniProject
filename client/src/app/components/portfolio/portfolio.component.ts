import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  
  stockName = ""
  param$!: Subscription
  stocksList: Array<String> = ["TSLA", "IBM"]

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockSvc: StockService, 
    private router: Router) { }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      async (params) => {
        this.stockName = params['stockName'];
        console.log('[ngOnInit] portfolio component >>> this.stockName = ', this.stockName);
        console.log("stocks array >>> ", this.stocksList)
        this.stocksList.push(this.stockName)
      
      }
    );
  }
}
