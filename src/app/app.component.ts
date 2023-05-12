import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bankNames = ['CIB', 'NBK', 'QNB' , 'BDC'];
  bankInfo = [
    [
      { name: 'Opened Tickets', value: 2000 },
      { name: 'Closed Tickets', value: 1500 },
      { name: 'Cancelled Tickets', value: 300 },
      { name: 'Suspended Tickets', value: 100 },
    ],
    [
      { name: 'Opened Tickets', value: 600 },
      { name: 'Closed Tickets', value: 1200 },
      { name: 'Cancelled Tickets', value: 600 },
      { name: 'Suspended Tickets', value: 200 },
    ],
    [
      { name: 'Opened Tickets', value: 1000 },
      { name: 'Closed Tickets', value: 1600 },
      { name: 'Cancelled Tickets', value: 600 },
      { name: 'Suspended Tickets', value: 170 },
    ],
    [
      { name: 'Opened Tickets', value: 600 },
      { name: 'Closed Tickets', value: 700 },
      { name: 'Cancelled Tickets', value: 800 },
      { name: 'Suspended Tickets', value: 900 },
    ],
  ];
  chartOptions: any = [];
  public options!: AgChartOptions;


  constructor() {
    for (let i = 0; i < this.bankNames.length; i++) {
      this.chartOptions.push('option' + [i]);
      this.chartOptions[i] = this.options;
      this.chartOptions[i] = {
        autoSize: true,
        title: {
          text: this.bankNames[i],
          fontSize: 18,
          spacing: 25,
        },
        series: [
          {
            data: this.bankInfo[i],
            type: 'pie',
            calloutLabelKey: 'name',
            sectorLabelKey: 'value',
            angleKey: 'value',
          },
        ],
        legend: {
          enabled: true,
        },
      }
    }
  }
}