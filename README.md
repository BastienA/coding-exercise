# test-wavebreak 
> coding exercise from Wavebreak Media

## Installation

```sh
$ npm install
$ gulp build
```

## Testing

```sh
$ gulp
```

## Assumptions

A few assumptions have been made for the test :

  - The period can have multiple months and therefore must generate multiple payslips
  - A month comes with a % that represents the number of days included in the period (Example: `01 May 15 May` doesn't make a full month pay)
  - The csv files are always constructed with the same order : (first name, last name, annual Salary, pension rate %, period)

## Usage

```sh
$ node ./dist/start.js /path/to/file.csv
```

the result will be created under 

```sh
$ /path/to/file-payslips.csv
```
## License

unlicense © [Bastien Allegret]

[Bastien Allegret]: https://github.com/BastienA
