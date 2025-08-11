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
    <div className={`rounded-xl  ${sizeClass} ${colorClass} p-4 text-secondary border-solid border-r border-b border-secondary-100 border-t border-b-primary-50 border-l border-r-primary-50`}>
      {children}
    </div>
  )
}
