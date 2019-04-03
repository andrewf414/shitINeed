"use strict";

class TimeStuff {

  //#region Add / subtract time
  // Returns a date that is days in the past, based off UTC time.
  static subtractDays(date, days, startOfDay) {
    let timeToSubtract = days * 86400000; // 24 * 60 * 60 * 1000;
    let newDate = new Date(date.valueOf() - timeToSubtract);
    
    if(startOfDay) {
      return new Date(newDate.setHours(0,0,0,0));
    } else {
      return newDate;
    }
  }

  // Returns a date that is days in the future, based off UTC time.
  static addDays(date, days, startOfDay) {
    let timeToAdd = days * 86400000; // 24 * 60 * 60 * 1000;
    let newDate = new Date(date.valueOf() + timeToAdd);
    
    if(startOfDay) {
      return new Date(newDate.setHours(0,0,0,0));
    } else {
      return newDate;
    }
  }

  static subtractHours(date, hours) {
    const timeToAdd = -hours * 3600000;
    const newDate = new Date(date.valueOf() + timeToAdd);

    return newDate;
  }

  static addHours(date, hours) {
    const timeToAdd = hours * 3600000;
    const newDate = new Date(date.valueOf() + timeToAdd);

    return newDate;
  }

  static subtractMinutes(date, minutes) {
    const timeToAdd = -minutes * 60000;
    const newDate = new Date(date.valueOf() + timeToAdd);

    return newDate;
  }

  static addMinutes(date, minutes) {
    const timeToAdd = minutes * 60000;
    const newDate = new Date(date.valueOf() + timeToAdd);

    return newDate;
  }
  //#endregion

  //#region Time between
  // Calculate time between two dates
  static secondsBetween(startDate, endDate) {
    return (endDate.valueOf() - startDate.valueOf()) / 1000;
  }
  static minutesBetween(startDate, endDate) {
    return this.secondsBetween(startDate, endDate) / 60;
  }
  static daysBetween(startDate, endDate) {
    return this.minutesBetween(startDate, endDate) / 1440;
  }
  static weeksBetween(startDate, endDate) {
    return this.daysBetween(startDate, endDate) / 7;
  }
  static yearsBetween(startDate, endDate) {
    return this.daysBetween(startDate, endDate) / 365.25;
  }
  static timeBetween(startDate, endDate) {
    let timeElapsed = {
      seconds: this.secondsBetween(startDate, endDate),
      minutes: 0,
      hours: 0,
      days: 0,
      weeks: 0,
      years: 0
    }
    
    if (timeElapsed.seconds < 60) {
      return timeElapsed;
    }
    timeElapsed.minutes = Math.floor(timeElapsed.seconds/60);
    timeElapsed.seconds = timeElapsed.seconds % 60;

    if (timeElapsed.minutes < 60) {
      return timeElapsed;
    }
    timeElapsed.hours = Math.floor(timeElapsed.minutes/60);
    timeElapsed.minutes = timeElapsed.minutes % 60;

    if (timeElapsed.hours < 24) {
      return timeElapsed;
    }
    timeElapsed.days = Math.floor(timeElapsed.hours/24);
    timeElapsed.hours = timeElapsed.hours % 24;

    if (timeElapsed.days < 7) {
      return timeElapsed;
    }
    timeElapsed.weeks = Math.floor(timeElapsed.days/7);
    timeElapsed.days = timeElapsed.days % 7;

    if (timeElapsed.weeks < 52) {
      return timeElapsed;
    }
    timeElapsed.years = Math.floor(timeElapsed.weeks/52);
    timeElapsed.weeks = timeElapsed.weeks % 52;

    return timeElapsed;
  }
  //#endregion

  //#region Conversions etc
  static utcToLocal(datetime) {
    const offset = new Date().getTimezoneOffset() / 60;
    const newD = this.subtractHours(datetime, offset);
   
    return newD;
  }

  static localToUtc(datetime) {
    const offset = new Date().getTimezoneOffset() / 60;
    const newD = this.addHours(datetime, offset);
   
    return newD;
  }

  static daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  static longDay(day) {
    return this.prototype.days[day];
  }

  static toDateTimeString(date) {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
  }
  //#endregion
}

TimeStuff.prototype.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
TimeStuff.prototype.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

module.exports = TimeStuff;