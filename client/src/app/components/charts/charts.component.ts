import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { StockPriceMonthly } from 'src/app/models/stockpricemonthly';
import { StockService } from 'src/app/services/stock.service';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],

})
export class ChartsComponent implements OnInit {

  @Input()
  stockName!: string

  constructor(
    private stkSvc: StockService) { }

  ngOnInit(): void {

        this.tempSvc(this.stockName)

  }

  async tempSvc(stockName: string) {
      this.stkSvc.getStockPriceMonthly(stockName).then(
        data => {
          this.renderChart(data.symbol, data.prices)
          
        }
      )
  }

  renderChart(symbol: string, data: number[]) {

    const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    Highcharts.chart('chart-container', {
      title: {
        text: `Stock Price for ${symbol}`
      },
      xAxis: {
        categories: categories
      },
      yAxis: [{
        title: {
          text: 'Price'
        }
      }, {
        title: {
          text: 'Volume'
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      series: [{
        name: 'Price',
        type: 'line',
        data: data,
        yAxis: 0
      }]
    });
  }
}

