import Calculator from '../lib/calculator';
import {expect} from 'chai';


describe('Calculator object', function () {
  let calculator;

  before(function () {
    calculator = new Calculator();
  });

  it('should be defined', function () {
    expect(calculator).to.exist;
    expect(calculator).to.be.an.instanceOf(Calculator);
  });


  it('should have a grossIncome method', function () {
    expect(calculator).to.have.property('grossIncome');
    expect(calculator.grossIncome).to.be.a('function');
  });


  describe('incomeTax method', function () {
    it('should be defined', function () {
      expect(calculator).to.have.property('incomeTax');
      expect(calculator.incomeTax).to.be.a('function');
    });

    it('should return a positive number', function () {
      let result = calculator.incomeTax(10000);
      expect(result).to.exist;
      expect(result).to.be.at.least(0);
    });

    describe('ATO tax table', function () {

      it('should return 0 under $18,200 annual income', function () {
        expect(calculator.incomeTax(15000)).to.equal(0);
      });

      it('should return 19c for each $1 over $18,200 for annual income between $18,201 and $37,000', function () {
        expect(calculator.incomeTax(25000)).to.equal(Math.round(((25000 - 18200) * 0.19) / 12));
      });

      it('should return $3,572 plus 32.5c for each $1 over $37,000 for annual income between $37,001 and $80,000', function () {
        expect(calculator.incomeTax(50000)).to.equal(Math.round(((50000 - 37000) * 0.325 + 3572) / 12));
      });

      it('should return $17,547 plus 37c for each $1 over $80,000 for annual income between $80,001 and $180,000', function () {
        expect(calculator.incomeTax(150000)).to.equal(Math.round(((150000 - 80000) * 0.37 + 17547) / 12));
      });

      it('should return $54,547 plus 45c for each $1 over $180,000 for annual income above $180,00 1 ', function () {
        expect(calculator.incomeTax(250000)).to.equal(Math.round(((250000 - 180000) * 0.45 + 54547) / 12));
      });


    });

    it('should throw an error if no argument is provided or argument is not number', function () {
      expect(calculator.incomeTax).to.throw(Error);
      expect(calculator.incomeTax.bind(calculator, 'fine')).to.throw(Error)
    });
  });


  describe('netIncome method', function () {
    it('should be defined', function () {
      expect(calculator).to.have.property('netIncome');
      expect(calculator.netIncome).to.be.a('function');
    });

    it('should return a positive number', function () {
      let result = calculator.netIncome(10000);
      expect(result).to.exist;
      expect(result).to.be.at.least(0);
    });

    it('should throw an error if no argument is provided or argument is not number', function () {
      expect(calculator.netIncome).to.throw(Error);
      expect(calculator.netIncome.bind(calculator, 'fine')).to.throw(Error)
    });
  });


  describe('pensionContribution method', function () {
    it('should be defined', function () {
      expect(calculator).to.have.property('pensionContribution');
      expect(calculator.pensionContribution).to.be.a('function');
    });

    it('should return a positive number', function () {
      let result = calculator.pensionContribution(10000, 9);
      expect(result).to.exist;
      expect(result).to.be.at.least(0);
    });

    it('should throw an error if no argument is provided or argument is not number', function () {
      expect(calculator.pensionContribution).to.throw(Error);
      expect(calculator.pensionContribution.bind(calculator, 'fine')).to.throw(Error)
    });
  });

  describe('payslip method', function () {
    it('should be defined', function () {
      expect(calculator).to.have.property('payslip');
      expect(calculator.payslip).to.be.a('function');
    });

    it('should generate an Array of payslip object from an employeeData object', function () {
      const employeeData = {
        firstName: 'Bastien',
        lastName: 'Allegret',
        rate: '9%',
        salary: '50000',
        period: '01 May 31 May'
      };
      expect(calculator.payslip.bind(calculator,employeeData)).not.to.throw(Error);

      let payslip = calculator.payslip(employeeData);
      expect(payslip).to.exist;
      expect(payslip).not.to.be.empty;
      expect(payslip[0]).to.have.property('name');
      expect(payslip[0]).to.have.property('period');
      expect(payslip[0]).to.have.property('grossIncome');
      expect(payslip[0]).to.have.property('incomeTax');
      expect(payslip[0]).to.have.property('netIncome');
      expect(payslip[0]).to.have.property('pensionContribution');
    });
  });

  describe('transform method', function () {
    it('should be defined', function () {
      expect(calculator).to.have.property('transform');
      expect(calculator.transform).to.be.a('function');
    });


    it('should have a _transform method from stream.Transform', function () {
      expect(calculator.transform()).to.have.property('_transform');
      expect(calculator.transform()._transform).to.be.a('function');
    });
  })
});

