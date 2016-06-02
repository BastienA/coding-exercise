import moment from 'moment';
import {Transform} from 'stream';
import {inherits} from 'util';
import periodDecoder from './period-decoder';


function PayslipTransformer(calculator, options) {
  let optionsDefault = options || {};
  optionsDefault.objectMode = true;
  Transform.call(this, optionsDefault);
  this.calculator = calculator || new Calculator();
}

inherits(PayslipTransformer, Transform);

PayslipTransformer.prototype._transform = function (obj, encoding, callback) {
  var result = [];
  try {
    result = this.calculator.payslip(obj);
  } catch (e) {
    callback(e);
  }

  for (const payslip of result) {
    this.push(payslip);
  }

  callback();
};


class Calculator {
  constructor() {}

  grossIncome(annualSalary, monthRate) {
    const rate = monthRate || 1;
    return Math.round((annualSalary / 12) * rate)
  }

  incomeTax(annualSalary, monthRate) {
    let rate = monthRate || 1;
    if (annualSalary == null || typeof annualSalary !== "number") {
      throw new Error();
    }
    if (annualSalary > 180000) {
      return Math.round((((annualSalary - 180000) * 0.45 + 54547) / 12) * rate);
    }
    if (annualSalary > 80000) {
      return Math.round((((annualSalary - 80000) * 0.37 + 17547) / 12) * rate);
    }
    if (annualSalary > 37000) {
      return Math.round((((annualSalary - 37000) * 0.325 + 3572) / 12) * rate);
    }
    if (annualSalary > 18200) {
      return Math.round((((annualSalary - 18200) * 0.19) / 12) * rate);
    }
    return 0;
  }

  netIncome(annualSalary, monthRate) {
    if (annualSalary == null || typeof annualSalary !== "number") {
      throw new Error();
    }
    return this.grossIncome(annualSalary, monthRate) - this.incomeTax(annualSalary, monthRate);
  }

  pensionContribution(annualSalary, rate, monthRate) {
    if (annualSalary == null || typeof annualSalary !== "number" || rate == null || typeof  rate !== "number") {
      throw new Error();
    }
    return Math.round(this.grossIncome(annualSalary, monthRate) * (rate / 100))
  }

  payslip(employeeData) {
    // deconstruct the argument
    let {firstName, lastName, salary: annualSalaryRaw, rate: pensionRateRaw, period: periodRaw} = employeeData;
    //verify no expected data is missing
    if (!lastName || !firstName || !annualSalaryRaw || !pensionRateRaw || !periodRaw) {
      return [];
    }


    let annualSalary = parseInt(annualSalaryRaw);
    let pensionRate = parseInt(pensionRateRaw.replace('%', ''));

    // TODO: Get the number of month selected
    let periods = periodDecoder(periodRaw);

    let results = [];

    // iterate over the different month and generate payslip for each month
    for (const period of periods) {
      results.push({
        name: `${firstName} ${lastName}`,
        period: period.periodName,
        grossIncome: this.grossIncome(annualSalary,period.monthRate),
        incomeTax: this.incomeTax(annualSalary,period.monthRate),
        netIncome: this.netIncome(annualSalary,period.monthRate),
        pensionContribution: this.pensionContribution(annualSalary, pensionRate,period.monthRate)
      });
    }

    return results;

  }

  transform() {
    return new PayslipTransformer(this);
  }
}

export default Calculator;
