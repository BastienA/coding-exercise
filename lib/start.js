import payslipStream from './payslip-stream';
import path from 'path';


// Check argument for input file path
let pathToCsv;
console.log(process.cwd());
try {
  let argument = process.argv[2];
  pathToCsv = path.isAbsolute(argument) ? argument : path.join(process.cwd(),argument);
} catch (e) {
  throw e;
}

payslipStream(pathToCsv);
