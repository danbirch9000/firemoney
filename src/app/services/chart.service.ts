import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ChartService {

  getChartData() {

    var chartObject = {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: "Value",
            data: [],
            backgroundColor: 'rgba(49,165,157, 1)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            fontColor: 'rgba(255,255,255,1)'
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    }

    return chartObject;

  }
}