import moment from 'moment';

class Calculator {
  constructor() {
  }

  grossIncome(annualSalary) {
    return Math.round(annualSalary / 12)
  }

  incomeTax(annualSalary) {
    if (annualSalary == null || typeof annualSalary !== "number") {
      throw new Error();
    }
    if (annualSalary > 180000) {
      return Math.round(((annualSalary - 180000) * 0.45 + 54547) / 12);
    }
    if (annualSalary > 80000) {
      return Math.round(((annualSalary - 80000) * 0.37 + 17547) / 12);
    }
    if (annualSalary > 37000) {
      return Math.round(((annualSalary - 37000) * 0.325 + 3572) / 12);
    }
    if (annualSalary > 18200) {
      return Math.round(((annualSalary - 18200) * 0.19) / 12)
    }
    return 0;
  }

  netIncome(annualSalary) {
    if (annualSalary == null || typeof annualSalary !== "number") {
      throw new Error();
    }
    return this.grossIncome(annualSalary) - this.incomeTax(annualSalary);
  }

  pensionContribution(annualSalary, rate) {
    if (annualSalary == null || typeof annualSalary !== "number" || rate == null || typeof  rate !==  "number") {
      throw new Error();
    }
    return Math.round(this.grossIncome(annualSalary) * (rate / 100))
  }

  payslip(employeeData) {
    // deconstruct the argument
    let {firstName,lastName, salary: annualSalary, rate: pensionrate, period: rawPeriod} = employeeData;

    //verify no expected data is missing
    if (!lastName || !firstName || !annualSalary || !pensionrate || !rawPeriod) {
      return [];
    }
    // TODO: Get the number of month selected
    let periods = [rawPeriod];

    let results = [];

    // iterate over the different month and generate payslip for each month
    for (const period of periods) {
      results.push({
        name: `${firstName} ${lastName}`,
        period: period,
        grossIncome: this.grossIncome(annualSalary),
        incomeTax: this.incomeTax(annualSalary),
        netIncome: this.netIncome(annualSalary),
        pensionContribution: this.pensionContribution(annualSalary, pensionrate)
      });
    }

    return results;

  }
}

export default Calculator;
