# test-wavebreak [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> coding exercise from Wavebreak Media

## Installation

```sh
$ npm install
```

## Assumptions

A few assumptions have been made for the test :

  - The period can have multiple months and therefore must generate multiple payslips
  - The csv files are always constructed with the same order : (first name, last name, annual Salary, pension rate %, period)

## Usage

```sh
$ node start ./path/to/file.csv
```

the result will be created under 

```sh
$ ./path/to/file-payslips.csv
```
## License

unlicense © [Bastien Allegret]()


[npm-image]: https://badge.fury.io/js/test-wavebreak.svg
[npm-url]: https://npmjs.org/package/test-wavebreak
[travis-image]: https://travis-ci.org/BastienA/test-wavebreak.svg?branch=master
[travis-url]: https://travis-ci.org/BastienA/test-wavebreak
[daviddm-image]: https://david-dm.org/BastienA/test-wavebreak.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/BastienA/test-wavebreak
