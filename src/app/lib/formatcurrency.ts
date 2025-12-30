export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    })

}
