import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],

})
export class ChartsComponent{

  lineChartData = [10, 2, 3, 6, 9, 17, 20, 10, 5, 2, 16, 5, 1, 4, 9, 4, 20, 2, 7, 1, 3, 14];
  lineChartData2 = [5, 1, 4, 9, 4, 20, 2, 7, 1, 3, 14, 10, 2, 3, 6, 9, 17, 20, 10, 5, 2, 16];
  pieCharData = [
    { name: 'COVID-19', y: 25, custom: { extraInformation: 'test for extra information'}, color: 'black' },
    { name: 'HIV/AIDS', y: 5, color: 'blue' },
    { name: 'EBOLA', y: 7, color: 'red' },
    { name: 'DISPORA', y: 3, color: 'green' },
    { name: 'DIABETES', y: 13, color: 'yellow' }
  ]

  lineChart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Patients'
    },
    credits: {
      enabled: false
    },
    yAxis: {
      title: {
        text: 'Number of Patients'
      }
    },
    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2023'
      }
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    series: [
      {
        name: 'Patients admitted',
        data: this.lineChartData,
      } as any,
      {
        name: 'Patients discharged',
        data: this.lineChartData2,
      } as any
    ]
  })

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
      text: 'Diseases'
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'pie',
        data: this.pieCharData
      }
    ]

  })
}
