import csv from 'csv-parser';

export default function () {
  return csv({
    raw: false,     // do not decode to utf-8 strings
    separator: ',', // specify optional cell separator
    newline: '\n',  // specify a newline character
    strict: false,
    headers: ['firstName','lastName','salary','rate','period']
  });
}
