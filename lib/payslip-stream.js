import csv from 'csv-parser';
import fs from 'fs';
import write from 'csv-write-stream';
import Calculator from './calculator';

export default function (pathToCsv) {

  let pathToDest = pathToCsv.replace('.csv', '-payslips.csv');
  let calculator = new Calculator();

  fs.createReadStream(pathToCsv)
    .pipe(csv({
      raw: false,     // do not decode to utf-8 strings
      separator: ',', // specify optional cell separator
      newline: '\n',  // specify a newline character
      strict: false,
      headers: ['firstName','lastName','salary','rate','period']
    }))
    .pipe(calculator.transform())
    .pipe(write())
    .pipe(fs.createWriteStream(pathToDest));
};
