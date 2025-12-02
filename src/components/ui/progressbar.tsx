type ProgressBarProps = {
  value: number // 0 till 100
  height?: string // t.ex. "h-2", "h-4"
  color?: string // t.ex. "bg-amber-500"
}

/**
 * Render a horizontal progress bar whose fill reflects a percentage value.
 *
 * @param value - Percentage value used to set the fill width; values are clamped to the range 0–100
 * @param height - CSS height utility class applied to the bar container (e.g., "h-2", "h-4")
 * @param color - CSS background/color utility class applied to the fill (e.g., "bg-amber-500")
 * @returns A JSX element representing a horizontal progress bar whose inner fill width corresponds to the clamped `value`. The outer container is hidden by default and becomes visible at the small-screen breakpoint.
 */
export function ProgressBar({ value, height = "h-2", color = "bg-accent-500" }:ProgressBarProps) {
  const width = `${Math.min(Math.max(value, 0), 100)}%` // Säkerställ 0–100

  return (
    <div className={`w-2/3 bg-gray-300 rounded-full overflow-hidden ${height} sm:block hidden`}>
      <div
        className={`${color} h-full transition-all duration-300`}
        style={{ width }}
      />
    </div>
  )
}