import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  stockName = "";
  param$!: Subscription;
  stocks!: Stock[];
  // characters!: Character[];
  currentIndex!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockSvc: StockService, 
    private router: Router) { }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      async (params) => {
        this.stockName = params['stockName'];
        console.log('[ngOnInit] >>> this.stockName = ' + this.stockName);
        const lst = await this.stockSvc.getStocks(this.stockName);
        this.currentIndex = 1;
        console.log('[ngOnInit] >>> stockSvc.getStocks ' + lst);
        if (lst === undefined || lst.length == 0) {
          this.router.navigate(['/overview'])
        } else {
          this.stocks = lst;
        }
      }
    );

  }

  ngOnDestroy(): void {
    console.log('[ngOnDestroy] >>> unsubscribe ');
    this.param$.unsubscribe();
  }
}
