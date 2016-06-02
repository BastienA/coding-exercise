import payslipStream from './payslip-stream';
import path from 'path';


// Check argument for input file path
let pathToCsv;
try {
  let argument = process.argv[2];
  pathToCsv = path.isAbsolute(argument) ? argument : path.join(__dirname,argument);
} catch (e) {
  throw e;
}

payslipStream(pathToCsv);
