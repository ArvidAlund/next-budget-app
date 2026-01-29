/**
 * Format a numeric amount according to the user's preferred thousand separator and decimal settings.
 *
 * @param amount - The numeric value to format
 * @returns The formatted string according to the user's thousand-separator and transaction-decimal settings, or `undefined` if the stored format setting is unrecognized
 */
export function formatCurrency(amount: number) {
  const options = localStorage.getItem("user_options");
  const formatSetting = options ? JSON.parse(options).thousand_separator : "decimal";
  const transactionDecimalSetting : boolean = options ? JSON.parse(options).transaction_decimals : true;

  if (formatSetting === "space") {
    return amount.toLocaleString("sv-SE", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: transactionDecimalSetting ? 2 : 0,
    }).replace(/\u00A0/g, ' '); // Replace non-breaking space with regular space
  }
  if (formatSetting === "comma") {
    return amount.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: transactionDecimalSetting ? 2 : 0,
    });
  }

  if (formatSetting === "none") {
    if (!transactionDecimalSetting) {
      const parts = amount.toString().split(".");
      return parts[0].toString().replace(" ", "");
    }
    return parseFloat(amount.toString().replace(" ", ""));
  }

  if (formatSetting === "dot") {
    return amount.toLocaleString("de-DE", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: transactionDecimalSetting ? 2 : 0,
    });
  }
}