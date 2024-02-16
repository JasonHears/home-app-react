/**
 * Formats the input amount as currency
 * @param {Number} amount currency amount
 * @param {String} locale string of local, such as 'en-US'
 * @param {String} currency string of currency type, such as 'USD'
 * @returns amount in currency format (or unaltered amount if not a number)
 */
export const formatCurrency = function (amount, locale, currency) {
  if (!Number(amount)) return amount;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

/**
 * Formats a number in ###.## money format
 * @param {Number} amount
 * @returns amount rounded to hundredths (or unaltered amount if not a number)
 */
export const roundMoney = function (amount) {
  if (!Number(amount)) return amount;
  return Math.round(amount * 100) / 100;
};
