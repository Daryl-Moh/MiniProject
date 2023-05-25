import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StockOverview } from 'src/app/models/stockoverview';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  quantityForm!: FormGroup
  stockName = ""
  param$!: Subscription
  stockOverview!: StockOverview

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private stockSvc: StockService,
    private authSvc: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.quantityForm = this.createForm()
    this.param$ = this.activatedRoute.params.subscribe(
      async (params) => {
        this.stockName = params['stockName'];
        try {
          const response = await this.stockSvc.getStockOverview(this.stockName);
          this.stockOverview = response;
        } catch (error) {
          console.error(error);
          this.router.navigate(['/search']);
          window.alert("Failed to retrieve stock overview. Please try again.");
        }
      }
    )
  }

  ngOnDestroy(): void {
    console.log('[ngOnDestroy]  >>> unsubscribe ')
    this.param$.unsubscribe();
  }

  addToPortfolio() {
    const quantity = this.quantityForm?.value['quantity']
    this.stockSvc.addToPortfolio(this.authSvc.userID, this.stockName, quantity)
      .then(() => this.router.navigate(['/home']))
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [Validators.required, Validators.min(1)])
    })
  }
}
