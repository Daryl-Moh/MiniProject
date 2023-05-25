import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, isEmpty } from 'rxjs';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  stockName = "";
  param$!: Subscription;
  stocks!: Stock[];
  currentIndex!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockSvc: StockService,
    private router: Router) { }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      async (params) => {
        this.stockName = params['stockName'];
        await this.stockSvc.getStocks(this.stockName)
          .then(response => {
            this.stocks = (response);
            if (this.stocks.length == 0) {
              this.router.navigate(['/search'])
              window.alert("The stock you have selected cannot be found")
            }
          }).catch((error) => {
            this.router.navigate(['/search'])
            window.alert("The stock you have selected cannot be found")
            console.error(error)
          })
      }
    );
  }

  ngOnDestroy(): void {
    console.log('[ngOnDestroy] >>> unsubscribe ');
    this.param$.unsubscribe();
  }
}
