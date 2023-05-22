import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  stocksList: string[] = []
  portfolio: Portfolio[] = []
  errorMsg!: string
  isLoggedIn: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockSvc: StockService,
    private authSvc: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn
    if (!this.authSvc.isLoggedIn) {
      window.alert("[ ACESS DENIED ] \n You are not logged in yet.")
      this.router.navigate(['/login']).then(() => {
        // window.location.reload()
      })
    }
    this.stockSvc.getUserStocksArray(this.authSvc.userID).then(
      data => {
          this.portfolio.push(data)
        }).catch((error: HttpErrorResponse) => {
          this.errorMsg = error.error
          console.log(error.error)
        })
  }
}
    








