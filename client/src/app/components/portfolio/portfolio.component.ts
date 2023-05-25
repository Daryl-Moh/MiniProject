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
      this.router.navigate(['/login'])
    }
    this.populatePieChartData()
  }

  populatePieChartData() {
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
      plotShadow: true
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'Quantity: <b>{point.y}</b> <br>Percentage: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        innerSize: '85%',
        borderWidth: 1,
        borderColor: 'black',
        slicedOffset: 10,
        animation: {
          duration: 1500
        },
        dataLabels: {
          enabled: true,
          connectorWidth: 3,
          format: '{point.name}: {y} units'
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









