/**
 * Formats a numeric amount as an en-US decimal string with no fractional digits.
 *
 * @param amount - The numeric value to format
 * @returns The formatted string using the en-US locale with zero decimal places
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    })

}