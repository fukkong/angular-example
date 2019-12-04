import {Component, OnInit} from '@angular/core';

import * as Highcharts from 'highcharts';
import Boost from 'highcharts/modules/boost';
import noData from 'highcharts/modules/no-data-to-display';
import More from 'highcharts/highcharts-more';
import * as moment from 'moment';
import {PedometerDaySummary, PedometerTimeSegment} from 'AutochekCommon/vanilla/objects/device-data-object';
import {drawPedometerChart} from 'AutochekChart/pedometer-chart';

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);

//window['moment'] = moment;
//MomentTimeZone();

@Component({
  selector: 'app-chart-pedometer',
  templateUrl: './chart-pedometer.component.html',
  styleUrls: ['./chart-pedometer.component.css']
})
export class ChartPedometerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const data = makeTestCase();
    drawPedometerChart('container', data);
  }
}

function makeTestCase() {
  let startOfWeek = moment().startOf('week').toDate();
  const now = moment().startOf('day');
  const diff = now.diff(startOfWeek, 'days');

  const rtnPedometerList: PedometerDaySummary[] = [];

  for (let i = 0; i < diff + 1; i++) {
    startOfWeek = moment(startOfWeek).add(1, 'day').utc();
    const step = Math.floor(Math.random() * 4000);
    const cal = Number.parseFloat((Math.random() * 100).toFixed(2));
    const dist = Number.parseFloat((Math.random() * 4).toFixed(2));
    const tempPedometer = new PedometerDaySummary(startOfWeek, step, cal, dist);
    rtnPedometerList.push(tempPedometer);
  }
  return rtnPedometerList;
}
