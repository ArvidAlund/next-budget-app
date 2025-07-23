type ContainerProps = {
  sizeClass?: string
  colorClass?: string
  children?: React.ReactNode
}

export function Container({
  sizeClass = "w-20 h-20",
  colorClass = "bg-amber-500",
  children
}: ContainerProps) {
  return (
    <div className={`rounded-xl ${sizeClass} ${colorClass} p-4 text-black`}>
      {children}
    </div>
  )
}
