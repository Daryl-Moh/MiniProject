import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, isEmpty } from 'rxjs';
import { Stock } from 'src/app/models/stock';
import { AuthService } from 'src/app/services/auth.service';
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
  isLoggedIn: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthService,
    private stockSvc: StockService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkLoggedIn()
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
