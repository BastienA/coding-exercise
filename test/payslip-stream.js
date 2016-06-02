import {expect} from 'chai';
import payslipStream from '../lib/payslip-stream';

describe('payslipStream method', function () {
  it('should be defined', function () {
    expect(payslipStream).to.exist;
    expect(payslipStream).to.be.a('function');
  });

  it('should trhow an error if the path provided doesn\'t point to a file', function () {
    expect(payslipStream).to.throw(Error);
  });
});
