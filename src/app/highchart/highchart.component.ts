import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {HttpClient} from '@angular/common/http';
import {interval, Subscription} from 'rxjs';
import * as moment from 'moment';

declare var require: any;

declare module 'highcharts' {
  interface Point {
    highlight: (event: Highcharts.PointEventsOptionsObject) => void
  }
}

const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.css']
})
export class HighchartComponent implements OnInit {
  public options: any = {
    chart: {
      tyep: 'line',
    },
    title: {
      text: 'Blood Pressure chart'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      shared: true,
      crosshairs: true
    },
    time: {
      timezone: 'Asia/Seoul'
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,
      startOnTick: true,
      endOnTick: true,
      title: {
        text: '시간'
      }
    },
    yAxis: [{
      labels: {
        format: '{value}mmHg',
        style: {
          color: Highcharts.getOptions().colors[3]
        }
      }
    }, {
      gridLineWidth: 1,
      title: {
        text: '맥박',
      },
      labels: {
        format: '{value}회/분',
        align: 'right',
      }
    }],
    plotOptions: {
      series: {
        marker: {
          enabled: true
        },
        pointWidth: 30
      }
    },
    series: [{
      name: '수축기',
      type: 'arearange',
      lineWidth: 1,
      fillOpacity: 0.3,
      zIndex: 0,
      color: Highcharts.getOptions().colors[3],
      data: []
    }, {
      name: '평균 혈압',
      zIndex: 1,
      data: [],
    }, {
      name: '심박수',
      type: 'column',
      yAxis: 1,
      zIndex: 0,
      opacity: 0.8,
      data: []
    }
    ]
  };
  subscription: Subscription;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const source = interval(10000);
    const updatedSystolic = [];
    const updatedAverage = [];
    const updatedRate = [];

    bpdata.forEach(row => {
      const time = new Date(row.date).getTime();
      console.log(moment(time).startOf('hour'));
      const tempSystolic = [
        time, row.diastolic, row.systolic
      ];
      const tempAverage = [
        time, row.mean
      ];
      const tempRate = [
        time, row.rate
      ];
      updatedSystolic.push(tempSystolic);
      updatedAverage.push(tempAverage);
      updatedRate.push(tempRate);
    });

    this.options.series[0]['data'] = updatedSystolic;
    this.options.series[1]['data'] = updatedAverage;
    this.options.series[2]['data'] = updatedRate;

    Highcharts.chart('container', this.options);

  }

  getApiResponse(url) {
    return this.http.get(url, {}).toPromise()
      .then(res => {
        return res;
      });
  }
}


const bpdata = [
  {
    'date': '2019-10-25T04:10:51.530Z',
    'systolic': 100,
    'diastolic': 80,
    'mean': 95,
    'rate': 120
  },
  {
    'date': '2019-10-25T04:18:51.530Z',
    'systolic': 110,
    'diastolic': 52,
    'mean': 95,
    'rate': 120
  },
  {
    'date': '2019-10-25T06:10:51.530Z',
    'systolic': 110,
    'diastolic': 55,
    'mean': 95,
    'rate': 120
  },
  {
    'date': '2019-10-25T07:10:51.530Z',
    'systolic': 110,
    'diastolic': 50,
    'mean': 95,
    'rate': 120
  },
  {
    'date': '2019-10-25T08:10:51.530Z',
    'systolic': 110,
    'diastolic': 82,
    'mean': 95,
    'rate': 120
  },
  {
    'date': '2019-10-25T09:10:51.530Z',
    'systolic': 110,
    'diastolic': 80,
    'mean': 95,
    'rate': 120
  },
  {
    'date': '2019-10-25T10:10:51.530Z',
    'systolic': 110,
    'diastolic': 80,
    'mean': 95,
    'rate': 120
  },
  {
    'date': '2019-10-25T11:10:51.530Z',
    'systolic': 110,
    'diastolic': 80,
    'mean': 95,
    'rate': 120
  },
  {
    'date': '2019-10-25T12:15:51.530Z',
    'systolic': 110,
    'diastolic': 80,
    'mean': 95,
    'rate': 120
  },
];
