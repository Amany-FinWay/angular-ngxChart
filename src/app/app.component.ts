import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bankNames = [{ name: 'CIB', selected: false }, { name: 'NBK', selected: false }, { name: 'QNB', selected: false }, { name: 'BDC', selected: false },{ name: 'ABC', selected: false }];
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
    [
      { name: 'Opened Tickets', value: 900 },
      { name: 'Closed Tickets', value: 500 },
      { name: 'Cancelled Tickets', value: 800 },
      { name: 'Suspended Tickets', value: 900 },
    ],
  ];
  chartOptions: any = [];
  allBankInfo: any = [] // this to push ALL objects into one array of objects
  public options!: AgChartOptions;
  public allBanksOption!: AgChartOptions; // This to draw All Banks Info in the chart
  selectedAll: any; // This to check if we should draw the all Banks Info or not
  checkedNames: any[] = []; // This to push all checked banksNames to calculate their info
  unCheckedNames: any[] = []; //  This to push all unchecked banksNames to ignore their info
  obj2: any; // This is the calcualed all bank info


  constructor() {
    for (let i = 0; i < this.bankNames.length; i++) {
      this.chartOptions.push('option' + [i]);
      this.chartOptions[i] = this.options;
      this.chartOptions[i] = {
        autoSize: true,
        title: {
          text: this.bankNames[i].name,
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

    this.bankNames.unshift({ name: 'All Banks', selected: false });
    this.bankInfo.unshift(obj2);
    console.log(obj2);
    this.obj2 = obj2;


  }

  // this to check if All Banks options is selected or not to draw the all banks chart
  selectAll() {
    for (var i = 0; i < this.bankNames.length; i++) {
      this.bankNames[i].selected = this.selectedAll;
    } 
    if (this.selectedAll) {
      this.allBanksOption = {
        autoSize: true,
        title: {
          text: this.bankNames[0].name,
          fontSize: 18,
          spacing: 25,
        },
        series: [
          {
            data: this.obj2,
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
    }else{
      return;
    }
  }

  // this to get the index of banksNames and banksInfo of the matched index in the checkedNames
  checkIfAllSelected(event: any) {
    const isChecked = event.target.checked;
    const value = event.target.value;
    if (isChecked) {
      this.checkedNames.push(value);
      console.log(this.checkedNames);
      for (let i = 0; i < this.checkedNames.length; i++) {
        for (let j = 0; j < this.bankNames.length; j++) {
          if (this.checkedNames[i] === this.bankNames[j].name){
            console.log(`Element ${this.checkedNames[i]} found at index ${j} in array1.`);
            console.log(this.bankInfo[j]);
            
          }
        }
      }
      
    } else {
      this.unCheckedNames.push(value);
      console.log(this.unCheckedNames);
    }
    
    this.selectedAll = this.bankNames.every(function(item:any) {
        return item.selected == true;
      })
  }
}