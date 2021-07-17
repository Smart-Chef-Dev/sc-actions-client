import { Currencies } from "../constants/currencies";

export const formatCurrency = (currencyCode, cost) => {
  const currency = Currencies[currencyCode];

  if (!currency) {
    return cost;
  }

  return currency.currencySymbolAtStart
    ? currency.symbol + cost
    : cost + currency.symbol;
};
