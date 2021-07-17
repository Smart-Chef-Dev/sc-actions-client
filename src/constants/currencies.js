export const CurrencyCode = {
  BYN: "BYN",
  USD: "USD",
  RUB: "RUB",
  EUR: "EUR",
  PLN: "PLN",
};

export const Currencies = {
  [CurrencyCode.BYN]: {
    id: CurrencyCode.BYN,
    symbol: "руб",
    currencySymbolAtStart: false,
  },
  [CurrencyCode.USD]: {
    id: CurrencyCode.USD,
    symbol: "$",
    currencySymbolAtStart: false,
  },
  [CurrencyCode.RUB]: {
    id: CurrencyCode.RUB,
    symbol: "₽",
    currencySymbolAtStart: false,
  },
  [CurrencyCode.EUR]: {
    id: CurrencyCode.EUR,
    symbol: "€",
    currencySymbolAtStart: false,
  },
  [CurrencyCode.PLN]: {
    id: CurrencyCode.PLN,
    symbol: "zł",
    currencySymbolAtStart: false,
  },
};
