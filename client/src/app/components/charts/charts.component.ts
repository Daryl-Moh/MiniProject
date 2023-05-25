import { Component, Input, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import * as Highcharts from 'highcharts';

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

    this.getStockPrice(this.stockName)

  }

  async getStockPrice(stockName: string) {
    this.stkSvc.getStockPriceMonthly(stockName).then(
      data => {
        this.renderChart(data.symbol, data.prices, data.volumes)
      }
    )
  }

  renderChart(symbol: string, priceData: number[], volumeData: number[]) {

    const xAxis = ['Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023'];

    Highcharts.chart('chart-container', {
      title: {
        text: `Stock Price for ${symbol}`
      },
      xAxis: {
        categories: xAxis
      },
      yAxis: [{
        title: {
          text: 'Price',
        }
      }],
      tooltip: {
        shared: true,
        valueDecimals: 2,
        valuePrefix: '$',
        valueSuffix: ' USD'
      },
      series: [{
        name: 'Price',
        type: 'line',
        data: priceData,
        color: '#65209e',
        animation: { duration: 1500 },
        dataLabels: {
          enabled: true,
          borderRadius: 2,
          y: -10,
          shape: 'callout',
          format: '${point.y:,.2f}'
        }
      }]
    });
    Highcharts.chart('chart-container2', {
      lang: {
        numericSymbols: [' millions'],
        numericSymbolMagnitude: 1000000
      },
      title: {
        text: `Volume Traded for ${symbol}`
      },
      xAxis: {
        categories: xAxis
      },
      yAxis: [{
        title: {
          text: 'Volume',
        }
      }],
      tooltip: {
        shared: false
      },
      series: [
        {
          name: 'volume',
          type: 'column',
          data: volumeData,
          color: '#65209e',
          animation: { duration: 1500 },
          dataLabels: {
            enabled: true
          }
        }]
    });
  }
}

