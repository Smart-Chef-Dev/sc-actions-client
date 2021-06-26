import { Currencies } from "../constants/currencies";

export const formatCurrency = (currencyCode, cost) => {
  const currency = Currencies[currencyCode];

  if (currency.currencySymbolAtStart) {
    return currency.symbol + cost;
  }

  return cost + currency.symbol;
};
