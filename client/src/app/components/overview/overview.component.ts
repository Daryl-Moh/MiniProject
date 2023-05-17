import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StockOverview } from 'src/app/models/stockoverview';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{
  
  stockName = ""
  param$!: Subscription
  stockOverview!: StockOverview

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockSvc: StockService, 
    private router: Router) { }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      async (params) => {
        this.stockName = params['stockName'];
        console.log('[ngOnInt - OverviewComponent] >>> this.stockName = ' + this.stockName);
        this.stockOverview  = await this.stockSvc.getStockOverview(this.stockName);
        console.log('[ngOnInt - OverviewComponent] >>> stockSvc.getStockOverview = ' + this.stockOverview)
      }
    )
  }

  ngOnDestroy(): void {
    console.log('[ngOnDestroy]  >>> unsubscribe ')
    this.param$.unsubscribe();
  }

  addToPortfolio() {
    console.log("Adding to portfolio >>> " + this.stockName)
    // create repo call to add stockname to db as per user
    this.router.navigate(['/home', this.stockName])
  }
}
