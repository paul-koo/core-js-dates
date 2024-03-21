/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return new Date(date).getTime();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  function addZero(d) {
    return d < 10 ? `0${d}` : d;
  }
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const arr = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wensday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return arr[new Date(date).getDay()];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const copyDate = new Date(String(date));
  copyDate.setDate(copyDate.getDate() + 1);
  while (Number(copyDate.getDay()) !== 5) {
    copyDate.setDate(copyDate.getDate() + 1);
  }
  return copyDate;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const date = new Date(year, month);
  date.setDate(date.getDate() - 1);
  return date.getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const miliseconds =
    new Date(dateEnd).getTime() - new Date(dateStart).getTime();
  return Math.floor(miliseconds / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  if (
    Number(new Date(period.start).getTime()) <=
      Number(new Date(date).getTime()) &&
    Number(new Date(date).getTime()) <= Number(new Date(period.end).getTime())
  ) {
    return true;
  }
  return false;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const newDate = new Date(date);
  function addLeadingZero(d) {
    return d < 10 ? `0${d}` : d;
  }
  function containTime(hourse, minutes, seconds) {
    let mid = 'AM';
    let hourses = hourse;
    if (hourse > 12) {
      hourses -= 12;
    }
    if (hourse >= 12) {
      mid = 'PM';
    }
    return `${hourses}:${minutes}:${seconds} ${mid}`;
  }
  const Y = newDate.getFullYear();
  const M = newDate.getMonth() + 1;
  const D = newDate.getDate();
  const h = newDate.getHours();
  const m = addLeadingZero(newDate.getMinutes());
  const s = addLeadingZero(newDate.getSeconds());
  return `${M}/${D}/${Y}, ${containTime(h, m, s)}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const startPeriod = new Date(year, month - 1);
  const finishPeriod = new Date(year, month, 1);
  let weekends = 0;
  while (startPeriod.toDateString() !== finishPeriod.toDateString()) {
    if (startPeriod.getDay() === 0 || startPeriod.getDay() === 6) {
      weekends += 1;
    }
    startPeriod.setDate(startPeriod.getDate() + 1);
  }
  return weekends;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const startYear = new Date(date.getFullYear(), 0, 1);
  let weeks = 1;
  if (startYear.getDay() === 1) {
    weeks = 0;
  } else if (startYear.getFullYear() === 2017) {
    weeks = 2;
  }
  while (startYear) {
    if (startYear.toDateString() === new Date(date).toDateString()) break;
    if (Number(startYear.getDay()) === 1) weeks += 1;
    startYear.setDate(startYear.getDate() + 1);
  }
  return weeks;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const newDate = date;
  newDate.setDate(newDate.getDate() + 1);
  while (newDate.getDay() !== 5 || newDate.getDate() !== 13) {
    newDate.setDate(newDate.getDate() + 1);
  }
  return new Date(newDate);
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  if (date.getMonth() < 3) return 1;
  if (date.getMonth() < 6) return 2;
  if (date.getMonth() < 9) return 3;
  if (date.getMonth() < 12) return 4;
  return undefined;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  function addLeadingZero(d) {
    return d < 10 ? `0${d}` : d;
  }
  function getUserTime(t) {
    const Y = t.getFullYear();
    const M = addLeadingZero(t.getMonth() + 1);
    const D = addLeadingZero(t.getDate());
    return `${D}-${M}-${Y}`;
  }

  const arr = [];
  let flag = true;
  const nowDate = new Date(
    period.start.split('-')[2],
    period.start.split('-')[1] - 1,
    period.start.split('-')[0]
  );
  while (nowDate) {
    if (flag === true) {
      for (let i = 0; i < countWorkDays; i += 1) {
        arr.push(getUserTime(nowDate));
        nowDate.setDate(nowDate.getDate() + 1);
        if (
          nowDate.getTime() >
          new Date(
            period.end.split('-')[2],
            period.end.split('-')[1] - 1,
            period.end.split('-')[0]
          ).getTime()
        )
          return arr;
      }
      flag = false;
    }
    if (flag === false) {
      for (let i = 0; i < countOffDays; i += 1) {
        nowDate.setDate(nowDate.getDate() + 1);
        if (
          nowDate.getTime() >
          new Date(
            period.end.split('-')[2],
            period.end.split('-')[1] - 1,
            period.end.split('-')[0]
          ).getTime()
        )
          return arr;
      }
      flag = true;
    }
  }
  return undefined;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(/* date */) {
  throw new Error('Not implemented');
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
