import {expect} from 'chai';
import periodDecoder from '../lib/period-decoder';

describe('Period Decoder function', function () {
  it('should be defined', function () {
    expect(periodDecoder).to.exist;
    expect(periodDecoder).to.be.a('function');
  });

  it('should return an empty array if argument is undefined or empty string', function () {
    expect(periodDecoder()).to.be.empty;
    expect(periodDecoder('')).to.be.empty;
  });

  it('should return a period object {periodName: string, monthRate: number} with monthRatee between 0 and 1', function () {
    let periodArray = periodDecoder("01 May 31 May");
    expect(periodArray[0]).to.have.property('periodName');
    expect(periodArray[0]).to.have.property('monthRate');
    expect(periodArray[0].monthRate).to.be.within(0, 1);
  });

  it('should return a single element if the input period string is in a single month (01 May 31 May) ', function () {
    expect(periodDecoder("01 May 31 May")).to.have.lengthOf(1);
    expect(periodDecoder("15 May 27 May")).to.have.lengthOf(1);
  });

  it('should return multiple elements if the input period string is in multiple months (01 May 31 June) ', function () {
    expect(periodDecoder("01 May 30 June")).to.have.length.above(1);
    expect(periodDecoder("15 May 27 July")).to.have.length.above(2);
  });



});
