import moment from 'moment';

/**
 * build a period object with two moment object
 * @param startMoment
 * @param endMoment
 * @returns {{periodName: string, monthRate: *}}
 */
let getPeriodObject = function (startMoment, endMoment) {
  const displayFormat = 'DD MMMM';
  return {
    periodName: `${startMoment.format(displayFormat)} - ${endMoment.format(displayFormat)}`,
    monthRate: (endMoment.diff(startMoment, 'days') + 1) / endMoment.daysInMonth() // + 1 : we always include the start day
  };
};

function test() {
  return [{period: 4, month: 1}];
}

/**
 * retrieve the months covered by the period string argument and returns an Array of period Object
 * Example
 *  '01 MArch 31 March' => 1 month
 *  '01 March 30 April' => 2 month
 * @param period
 * @returns {*[]}
 */
export default function (period) {
   // split the string in 2. to have the beginning and end of the given period
  if (typeof period !== "string" || period.length === 0) {
    return [];
  }
  // We check the format of the period string against predefined one dd|d MMMM dd|d MMMM
  let regexDateRange = /([0-3]?[0-9]\s\w+)\s+([0-3]?[0-9]\s\w+)/gi;
  let matches = regexDateRange.exec(period);

  // If no match is found : we return an empty array
  if (!matches) {
    return [];
  }

  const dateFormats = ['DD MMMM', 'DD MMM', 'D MMMM', 'D MMM'];

  let startMoment = moment(matches[1],dateFormats),
      endMoment = moment(matches[2],dateFormats);


  if (startMoment.month() === endMoment.month() && startMoment.year() === endMoment.year()) {
    return [getPeriodObject(startMoment,endMoment)];
  }

  let results = [];

  const yearDiff = endMoment.year() - startMoment.year();

  // For every month in the range we build a periodObject that we add to the results Array
  for (let i = startMoment.month(); i <= endMoment.month() + (yearDiff * 12); i++) {
    // We have specific case at the beginning and end of the range
    if (i === startMoment.month()) {
      results.push(getPeriodObject(startMoment, moment(startMoment).endOf('month')));
    } else if (i === endMoment.month()) {
      results.push(getPeriodObject(moment(endMoment).startOf('month'), endMoment));
    } else {
      const monthDiff = i - startMoment.month();
      let startOfMonth = moment(startMoment).startOf('month').add(monthDiff, 'month');
      let endOfMonth = moment(startOfMonth).endOf('month');
      results.push(getPeriodObject(startOfMonth, endOfMonth));
    }
  }

  return results;
}
