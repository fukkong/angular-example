import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  nowDate = '';
  nowTime = '';
  now = moment();

  constructor() {
    this.nowDate = moment(new Date()).format('YYYY.MM.DD');
    this.nowTime = moment(new Date()).format('LT');
  }

  ngOnInit() {
  }

}
