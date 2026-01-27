/**
 * Formats a numeric amount as an en-US decimal string with no fractional digits.
 *
 * @param amount - The numeric value to format
 * @returns The formatted string using the en-US locale with no decimal places
 */
export function formatCurrency(amount: number) {
  const options = localStorage.getItem("user_options");
  const formatSetting = options ? JSON.parse(options).thousand_separator : "decimal";

  if (formatSetting === "space") {
    return amount.toLocaleString("sv-SE", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).replace(/\u00A0/g, ' '); // Replace non-breaking space with regular space
  }
  if (formatSetting === "comma") {
    return amount.toLocaleString("de-DE", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  if (formatSetting === "none") {
    return amount.toFixed(0);
  }

  if (formatSetting === "dot") {
    return amount.toLocaleString("en-IN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
}