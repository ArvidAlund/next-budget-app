type ContainerProps = {
  sizeClass?: string
  colorClass?: string
  children?: React.ReactNode
}

export function Container({
  sizeClass = "w-20 h-20",
  colorClass = "bg-primary-900",
  children
}: ContainerProps) {
  return (
    <div className={`rounded-xl  ${sizeClass} ${colorClass} p-4 text-secondary border-solid border-r border-b border-secondary-500 border-t border-b-secondary-50 border-l border-r-secondary-50 shadow-sm shadow-secondary-100`}>
      {children}
    </div>
  )
}
