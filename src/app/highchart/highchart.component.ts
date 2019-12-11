import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import Boost from 'highcharts/modules/boost';
import noData from 'highcharts/modules/no-data-to-display';
import More from 'highcharts/highcharts-more';
import xrange from 'highcharts/modules/xrange';
import * as moment from 'moment';
import MomentTimeZone from 'moment-timezone';
import {drawSleepChart} from '../../../AutochekChart/sleep-segment-chart';
import {PedometerHeartrateSegment, PedometerSleepSegment} from '@AutochekCommon/vanilla/objects/device-data-object';
import {drawHeartRateChart} from '@AutochekChart/heart-rate-chart';
import {drawBloodpressurePeriodChart} from '@AutochekChart/bpchart';

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
    const start = moment('2019-10-25T04:10:51.530Z').startOf('day').toDate();
    const end = moment('2019-10-25T12:15:51.530Z').endOf('day').toDate();
    drawBloodpressurePeriodChart('container2', bloodPressureData, {start: start, end: end});
    const testCase = makeTestCase();
    drawSleepChart('sleepLog', testCase);
    drawHeartRateChart('heartRate', heartRateData).then(() => {
    });
  }
}

function makeTestCase() {
  const addTime = Math.floor(Math.random() * 3 + 5);
  const rtnPedometerList: PedometerSleepSegment[] = [];
  let tempTime: Date = moment().startOf('day').toDate();
  for (let i = 0; i < addTime * 6; i++) {
    tempTime = new Date(moment(tempTime).add(10, 'minute').toDate());
    const tempSleepIndex = Math.floor(Math.random() * 3 + 1);
    const tempPedometer = new PedometerSleepSegment(tempTime, tempSleepIndex);
    rtnPedometerList.push(tempPedometer);
  }
  return rtnPedometerList;
}

const heartRateData: PedometerHeartrateSegment = [
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
