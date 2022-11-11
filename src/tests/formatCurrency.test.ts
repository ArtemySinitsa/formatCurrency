import { formatCurrency } from "../core/formatCurrency";

it.each([
  // currencySymbol, decimalSeparator, currencyValue, expectedResult
  ["$", ".", 1901, "$19.01"],
  ["£", ",", 190909090909, "£1909090909,09"],
  ["$", ",", 9007199254740991, "$90071992547409,91"],
  ["$", ",", 9007199254740990, "$90071992547409,90"],
  ["$", ",", 0, "$0,00"],
  ["$", ".", 12, "$0.12"],
  ["$", ".", 1, "$0.01"],
  ["$", ".", -20000, "-$200.00"],
  ["$", ".", -2, "-$0.02"]
])(
  "formatCurrency correctly format allowed values",
  (currencySymbol, decimalSeparator, currencyValue, expectedResult) => {
    const getUS = formatCurrency(currencySymbol, decimalSeparator);

    expect(getUS(currencyValue)).toBe(expectedResult);
  }
);

it.each([
  ["12", ","],
  ["#", "2"],
  [{ 1: 200 }, "2"],
  ["$", null],
  ["$", () => {}]
])(
  "formatCurrency throw for invalid symbol or separator",
  (currencySymbol, decimalSeparator) => {
    expect(() => formatCurrency(currencySymbol, decimalSeparator)).toThrow();
  }
);

it.each([
  ["£", ",", 9999999999999999999999],
  ["£", ",", null],
  ["£", ",", Infinity],
  ["£", ",", -Infinity]
])(
  "formatCurrency throw for invalid value",
  (currencySymbol, decimalSeparator, currencyValue) => {
    const getUS = formatCurrency(currencySymbol, decimalSeparator);

    expect(() => getUS(currencyValue)).toThrow();
  }
);
