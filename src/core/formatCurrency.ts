class Currency {
  private constructor(
    private readonly value: string,
    private readonly negative: boolean
  ) {}

  static from(value: number) {
    if (value === null || !isFinite(value) || isNaN(value)) {
      throw new Error("Invalid currency value provided :" + value);
    }
    if (value > Number.MAX_SAFE_INTEGER) {
      throw new Error("Value cannot be more than " + Number.MAX_SAFE_INTEGER);
    }

    return new Currency(value.toString().replace("-", ""), value < 0);
  }

  get fractionalMonetaryUnit() {
    const fractionalMonetaryUnit = this.value.substring(this.value.length - 2);
    return fractionalMonetaryUnit.padStart(2, "0");
  }

  get monetaryUnit() {
    return this.value.substring(0, this.value.length - 2) || "0";
  }

  get sign() {
    return this.negative ? "-" : "";
  }
}

class CurrencyFormatter {
  private constructor(
    private readonly currencySymbol: string,
    private readonly decimalSeparator: string
  ) {}

  static from(currencySymbol: string, decimalSeparator: string) {
    if (isFinite(+currencySymbol) || isFinite(+decimalSeparator)) {
      throw new Error(
        "Currency symbol or decimal separator cannot be a number"
      );
    }
    return new CurrencyFormatter(currencySymbol, decimalSeparator);
  }

  public format = (value: number): string => {
    const money = Currency.from(value);

    return `${money.sign}${this.currencySymbol}${money.monetaryUnit}${this.decimalSeparator}${money.fractionalMonetaryUnit}`;
  };
}

export const formatCurrency = function (
  currencySymbol: any,
  decimalSeparator: any
) {
  if (typeof currencySymbol !== "string") {
    throw new Error("Invalid currency symbol type: " + typeof currencySymbol);
  }
  if (typeof decimalSeparator !== "string") {
    throw new Error(
      "Invalid decimal separator type:" + typeof decimalSeparator
    );
  }
  return CurrencyFormatter.from(currencySymbol, decimalSeparator).format;
};
