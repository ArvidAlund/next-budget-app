type ProgressBarProps = {
  value: number // 0 till 100
  height?: string // t.ex. "h-2", "h-4"
  color?: string // t.ex. "bg-amber-500"
}

export function ProgressBar({ value, height = "h-2", color = "bg-accent-500" }:ProgressBarProps) {
  const width = `${Math.min(Math.max(value, 0), 100)}%` // Säkerställ 0–100

  return (
    <div className={`w-2/3 bg-gray-300 rounded-full overflow-hidden ${height}`}>
      <div
        className={`${color} h-full transition-all duration-300`}
        style={{ width }}
      />
    </div>
  )
}