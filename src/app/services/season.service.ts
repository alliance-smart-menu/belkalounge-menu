import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  public season: string = "default"

  constructor() { }

  checkSeason() {

    const month = moment().month() + 1

    if (month == 12 || month == 1) {
      this.season = "winter";
    }

  }


}
