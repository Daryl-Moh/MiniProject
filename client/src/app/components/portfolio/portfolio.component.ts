import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { Portfolio } from 'src/app/models/portfolio';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  errorMsg!: string
  isLoggedIn: boolean = false

  @Input()
  stockSymbol!: any

  @Input()
  stockQuantity!: any

  portfolio: Portfolio[] = []
  pieChartDataName: string[] = []
  pieChartDataY: number[] = []
  pieChartData: any[] = []

  constructor(
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
    this.showValue()
  }

  showValue() {
    console.log("[portfolio] this.stockSymbol >>> ", this.stockSymbol)
    console.log("[portfolio] this.stockQuantity >>> ", this.stockQuantity)
    for (let i = 0; i < this.stockSymbol.length; i++) {
      const data = {
        name: this.stockSymbol[i],
        y: this.stockQuantity[i]
      };
      this.pieChartData.push(data);
    }
  }

  pieChart = new Chart({
    
    chart: {
      type: 'pie',
      plotShadow: false
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      pointFormat: '{series.name}: Value: <b>{point.y}</b> Percentrage: <b>{point.percentage:.1f}%</b> <br>{point.custom.extraInformation}'
    },
    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 10,
        borderColor: '',
        slicedOffset: 10,
        dataLabels: {
          connectorWidth: 0,
        },
      },
    },
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: 'Stock Portfolio'
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'pie',
        data: this.pieChartData
      }
    ]

  })

}









