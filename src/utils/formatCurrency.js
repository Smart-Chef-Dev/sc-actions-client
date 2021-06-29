import { Currencies } from "../constants/currencies";

export const formatCurrency = (currencyCode, cost) => {
  const currency = Currencies[currencyCode];

  return currency.currencySymbolAtStart
    ? currency.symbol + cost
    : cost + currency.symbol;
};
