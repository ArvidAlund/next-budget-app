type ContainerProps = {
  height?: string
  width?: string
  bgColor?: string
  textColor?: string
  children?: React.ReactNode
}

export function Container({
  height = "h-full",
  width = "w-full",
  bgColor = "bg-primary-900",
  textColor = "text-secondary",
  children
}: ContainerProps) {
  return (
    <div className={`rounded-xl  ${height} ${width} ${bgColor} p-4 ${textColor} border-solid border-r border-b border-secondary-500 border-t border-b-secondary-50 border-l border-r-secondary-50 shadow-sm shadow-secondary-100`}>
      {children}
    </div>
  )
}
