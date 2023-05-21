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
  allBankInfo: any = []
  public options!: AgChartOptions;
  public allBanksOption!: AgChartOptions;
  


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




    // Push all objects into new array    
    const newArray: { name: string; value: number; }[] = [];
    
    this.bankInfo.forEach((innerArray) => {
      innerArray.forEach((object) => {
        newArray.push(object);
        this.allBankInfo.push(object)
      });
    });
    
    console.log(this.allBankInfo);


    // Sum all matched names' values

    var holder: any = {};

    this.allBankInfo.forEach(function (d: { name: string | number; value: any; }) {
      if (holder.hasOwnProperty(d.name)) {
        holder[d.name] = holder[d.name] + d.value;
      } else {
        holder[d.name] = d.value;
      }
    });

    var obj2 = [];

    for (var prop in holder) {
      obj2.push({ name: prop, value: holder[prop] });
    }

    this.bankNames.unshift('All Banks');
    this.bankInfo.unshift(obj2);
    console.log(obj2);



    this.allBanksOption = {
      autoSize: true,
      title: {
        text: this.bankNames[0],
        fontSize: 18,
        spacing: 25,
      },
      series: [
        {
          data: obj2,
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