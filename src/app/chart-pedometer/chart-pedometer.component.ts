import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import Boost from 'highcharts/modules/boost';
import noData from 'highcharts/modules/no-data-to-display';
import More from 'highcharts/highcharts-more';
import * as moment from 'moment';
import MomentTimeZone from 'moment-timezone';
import {GlucosemeterDaySummary, PedometerDaySummary, PedometerTimeSegment} from 'AutochekCommon/vanilla/objects/device-data-object';
import {drawPedometerChart} from 'AutochekChart/pedometer-chart';
import {drawGlucoseChart} from 'AutochekChart/glucose-chart';
import {AutochekChartOption} from 'AutochekChart/chart.option';

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);

window['moment'] = moment;
MomentTimeZone();

@Component({
  selector: 'app-chart-pedometer',
  templateUrl: './chart-pedometer.component.html',
  styleUrls: ['./chart-pedometer.component.css']
})
export class ChartPedometerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const end = moment().startOf('day').toDate();
    const startOfDay = moment(end).subtract(1, 'day').toDate();
    const start = moment(end).subtract(31, 'day').toDate();
    const data = makeTestCase(start, end);
    // const data = makeTestCaseforDayData(startOfDay, end);
    drawPedometerChart('container', data, {start, end});
    const glucoseData: GlucosemeterDaySummary[] = makeTestCaseForGlucose(start, end);
    const glucoseMinMax: AutochekChartOption = {
      glucose: {
        b_meal_min: 80,
        b_meal_max: 120,
        a_meal_min: 100,
        a_meal_max: 200,
        sleep_min: 80,
        sleep_max: 120
      }
    };
    drawGlucoseChart('glucose', glucoseData, glucoseMinMax);
  }
}

function makeTestCase(start, end) {
  const diff = moment(end).diff(start, 'days');

  const rtnPedometerList: PedometerDaySummary[] = [];

  for (let i = 0; i < diff + 1; i++) {
    const temp = moment(start).add(i, 'day').toDate();
    const step = Math.floor(Math.random() * 4000);
    const cal = Number.parseFloat((Math.random() * 100).toFixed(2));
    const dist = Number.parseFloat((Math.random() * 4).toFixed(2));
    const tempPedometer = new PedometerDaySummary(temp, step, cal, dist);
    rtnPedometerList.push(tempPedometer);
  }
  return rtnPedometerList;
}

function makeTestCaseforDayData(start, end) {
  const diff = moment(end).diff(start, 'second') / 300;

  const rtnPedometerTimeSegment: PedometerTimeSegment[] = [];

  for (let i = 0; i < diff; i++) {
    const temp = moment(start).add(5 * i, 'minute').toDate();
    const step = Math.floor(Math.random() * 1000);
    const cal = Number.parseFloat((Math.random() * 50).toFixed(2));
    const dist = Number.parseFloat((Math.random() * 2).toFixed(2));
    const tempPedometer = new PedometerTimeSegment(temp, 10, step, cal, dist);
    rtnPedometerTimeSegment.push(tempPedometer);
  }
  return rtnPedometerTimeSegment;
}

function makeTestCaseForGlucose(start, end) {
  const diff = moment(end).diff(start, 'day');

  const rtnGlucoseDaySummery: GlucosemeterDaySummary[] = [];

  for (let i = 0; i < diff; i++) {
    const temp = moment(start).add(i, 'day').toDate();
    const bBreakfast = Number.parseFloat((Math.random() * 140 + 50).toFixed(2));
    const aBreakfast = Number.parseFloat((Math.random() * 160 + 50).toFixed(2));
    // const bLunch = Number.parseFloat((Math.random() * 140 + 50).toFixed(2));
    const aLunch = Number.parseFloat((Math.random() * 140 + 50).toFixed(2));
    const bDinner = Number.parseFloat((Math.random() * 140 + 50).toFixed(2));
    // const aDinner = Number.parseFloat((Math.random() * 140 + 50).toFixed(2));
    const bSleep = Number.parseFloat((Math.random() * 140 + 50).toFixed(2));

    const tempGlucose = new GlucosemeterDaySummary(temp);

    tempGlucose.morningBeforeMeal = bBreakfast;
    tempGlucose.morningAfterMeal = aBreakfast;
    // tempGlucose.afternoonBeforeMeal = bLunch;
    tempGlucose.afternoonAfterMeal = aLunch;
    tempGlucose.eveningBeforeMeal = bDinner;
    // tempGlucose.eveningAfterMeal = aDinner;
    if (bSleep > 170) {
      tempGlucose.beforeSleep = bSleep;
    }

    rtnGlucoseDaySummery.push(tempGlucose);
  }

  return rtnGlucoseDaySummery;
}
