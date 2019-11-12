import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import Boost from 'highcharts/modules/boost';
import noData from 'highcharts/modules/no-data-to-display';
import More from 'highcharts/highcharts-more';
import xrange from 'highcharts/modules/xrange';
import * as moment from 'moment';
import MomentTimeZone from 'moment-timezone';

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
xrange(Highcharts);

window['moment'] = moment;
MomentTimeZone();

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.css']
})

export class HighchartComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    Highcharts.setOptions({
      lang: {
        months: [
          '1', '2', '3', '4',
          '5', '6', '7', '8',
          '9', '10', '11', '12'
        ],
        weekdays: [
          '일', '월', '화', '수', '목', '금', '토'
        ],
        shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      }
    });

    const start = moment().startOf('day').toDate();
    const end = moment().endOf('day').toDate();
    drawPeriodChart('container');
    drawSleepChart('sleepLog');
    drawHeartRateChart('heartRate');
  }
}

function setBloodPressureOption(bpData: any, start?: Date, end?: Date) {
  const options: any = {
    title: {
      text: 'Blood Pressure chart'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      shared: true
    },
    time: {
      timezone: 'Asia/Seoul'
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,
      title: {
        text: '시간'
      }
    },
    yAxis: [{
      min: 60,
      max: 220,
      startOnTick: false,
      endOnTick: false,
      labels: {
        format: '{value}mmHg',
        style: {
          color: Highcharts.getOptions().colors[3]
        }
      }
    }, {
      gridLineWidth: 1,
      opposite: true,
      title: {
        text: '맥박',
      },
      labels: {
        format: '{value}회/분',
        align: 'left',
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
    }]
  };

  if (start) {
    options.xAxis.min = start.getTime();
  }
  if (end) {
    options.xAxis.max = end.getTime();
  }

  const updatedSystolic = [];
  const updatedAverage = [];
  const updatedRate = [];

  bpData.forEach(data => {
    const time = new Date(data.date).getTime();
    const tempSystolic = [
      time, data.diastolic, data.systolic
    ];
    const tempAverage = [
      time, data.mean
    ];
    const tempRate = [
      time, data.rate
    ];
    updatedSystolic.push(tempSystolic);
    updatedAverage.push(tempAverage);
    updatedRate.push(tempRate);
  });

  options.series[0].data = updatedSystolic;
  options.series[1].data = updatedAverage;
  options.series[2].data = updatedRate;

  return options;
}

async function setHeartRateChartOption(heartRateData: any) {
  const options: any = {
    title: {
      text: 'Heart Rate Chart'
    },
    time: {
      timezone: 'Asia/Seoul'
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,
    },
    yAxis: {
      labels: {
        format: '{value}bpm',
      }
    },
    plotOptions: {},
    series: [{
      name: '심박수',
      type: 'spline',
      color: Highcharts.getOptions().colors[0],
      data: []
    }]
  };

  heartRateData.forEach(data => {
    const time = new Date(data.date).getTime();
    options.series[0].data.push([time, data.rate]);
  });

  const startOfDay = moment(heartRateData[0].date).startOf('day').toDate()
  const endOfDay = moment(heartRateData[heartRateData.length - 1].date).endOf('day').toDate()

  options.xAxis.min = startOfDay.getTime();
  options.xAxis.max = endOfDay.getTime();

  return options;
}

function drawPeriodChart(canvas: string, start?: Date, end?: Date) {
  // data query with start and end
  const bpData = bloodPressureData; // temporary set data as bloodPressureData
  // set option
  const option = setBloodPressureOption(bpData, start, end);
  // draw chart
  Highcharts.chart(canvas, option);
}

async function drawSleepChart(canvas: string, date?: Date) {
  // data query with date
  const slData = sleepSegment;
  // set option
  await setSleepSegmentOption(slData).then(option => {
    Highcharts.chart(canvas, option);
  });
}

async function drawHeartRateChart(canvas: string) {
  const option = await setHeartRateChartOption(bloodPressureData);
  await Highcharts.chart(canvas, option);
}

async function setSleepSegmentOption(sleepData: any) {
  const option: any = {
    chart: {
      type: 'xrange'
    },
    title: {
      text: '수면 패턴 기록'
    },
    time: {
      timezone: 'Asia/Seoul'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        minute: '%H시:%M분',
        hour: '%H시:%M분',
        day: '%b월 %e일',
        week: '%b월 %e일',
        month: '%y년 %b월'
      }
    },
    yAxis: {
      categories: ['수면패턴'],
      reversed: true,
      visible: false
    },
    plotOptions: {
      xrange: {
        grouping: false,
        borderRadius: 0,
        pointPadding: 0,
        groupPadding: 0,
        colorByPoint: false,
        dataLabels: {
          enabled: true
        }
      },
      series: {
        marker: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: '안 잠',
        data: [],
        color: '#BCC5FA'
      },
      {
        name: '얕은잠',
        data: [],
        color: '#00FF00'
      },
      {
        name: '깊은잠',
        data: [],
        color: '#0000FF'
      }]
  };

  let flag: number = sleepData[0].sleepIndex;
  let startTime = new Date(sleepData[0].date).getTime();
  let endTime;

  const notInSleep = [];
  const shallowSleep = [];
  const deepSleep = [];
  for (let i = 1; i < sleepData.length; i++) {
    const bool = sleepData[i].sleepIndex !== flag;
    if (i !== (sleepData.length - 1)) {
      if (bool) {
        endTime = new Date(sleepData[i].date).getTime();
        makeSleepData(flag, startTime, endTime, notInSleep, shallowSleep, deepSleep);

        startTime = new Date(sleepData[i].date).getTime();
        flag = sleepData[i].sleepIndex;
      }
    } else {
      if (!bool) {
        endTime = new Date(sleepData[i].date).getTime() + 300 * 1000;
        await makeSleepData(flag, startTime, endTime, notInSleep, shallowSleep, deepSleep);
      } else {
        endTime = new Date(sleepData[i].date).getTime();
        await makeSleepData(flag, startTime, endTime, notInSleep, shallowSleep, deepSleep);
        startTime = endTime;
        endTime = new Date(sleepData[i].date).getTime() + 300 * 1000;
        flag = sleepData[i].sleepIndex;
        await makeSleepData(flag, startTime, endTime, notInSleep, shallowSleep, deepSleep);
      }
    }
  }

  option.series[0].data = notInSleep;
  option.series[1].data = shallowSleep;
  option.series[2].data = deepSleep;

  return option;
}

async function makeSleepData(index: number, startTime: number, endTime: number, notInSleep, shallowSleep, deepSleep) {
  switch (index) {
    case 1:
      notInSleep.push({
        x: startTime,
        x2: endTime,
        y: 0
      });
      break;
    case 2:
      shallowSleep.push({
        x: startTime,
        x2: endTime,
        y: 0
      });
      break;
    case 3:
      deepSleep.push({
        x: startTime,
        x2: endTime,
        y: 0
      });
      break;
  }
}

const bloodPressureData = [
  {
    'date': '2019-10-25T04:10:51.530Z',
    'systolic': 100,
    'diastolic': 80,
    'mean': 80,
    'rate': 80
  },
  {
    'date': '2019-10-25T04:18:51.530Z',
    'systolic': 110,
    'diastolic': 62,
    'mean': 95,
    'rate': 120
  },
  {
    'date': '2019-10-25T06:10:51.530Z',
    'systolic': 110,
    'diastolic': 65,
    'mean': 95,
    'rate': 120
  },
  {
    'date': '2019-10-25T07:10:51.530Z',
    'systolic': 110,
    'diastolic': 70,
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
const sleepSegment = [
  {
    'date': '2019-10-25T12:15:51.530Z',
    'sleepIndex': 1
  },
  {
    'date': '2019-10-25T13:15:51.530Z',
    'sleepIndex': 2
  },
  {
    'date': '2019-10-25T14:10:51.530Z',
    'sleepIndex': 2
  },
  {
    'date': '2019-10-25T14:20:51.530Z',
    'sleepIndex': 3
  },
  {
    'date': '2019-10-25T14:30:51.530Z',
    'sleepIndex': 2
  },
  {
    'date': '2019-10-25T14:50:51.530Z',
    'sleepIndex': 1
  },
  {
    'date': '2019-10-25T15:15:51.530Z',
    'sleepIndex': 2
  },
  {
    'date': '2019-10-25T17:15:51.530Z',
    'sleepIndex': 1
  },
  {
    'date': '2019-10-25T17:45:51.530Z',
    'sleepIndex': 3
  },
  {
    'date': '2019-10-25T18:15:51.530Z',
    'sleepIndex': 2
  },
  {
    'date': '2019-10-25T18:25:51.530Z',
    'sleepIndex': 1
  },
  {
    'date': '2019-10-26T18:25:51.530Z',
    'sleepIndex': 1
  }
];
