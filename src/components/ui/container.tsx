type ContainerProps = {
  height?: string
  width?: string
  bgColor?: string
  textColor?: string
  children?: React.ReactNode
}

/**
 * Renders a styled container element that composes utility classes for dimensions, colors, and typography and renders its children.
 *
 * @param height - Tailwind (or similar) utility class token that controls the container's height (e.g., `"h-full"`)
 * @param width - Tailwind (or similar) utility class token that controls the container's width (e.g., `"w-full"`)
 * @param bgColor - Utility class token that sets the container background color (e.g., `"bg-primary-900"`)
 * @param textColor - Utility class token that sets the container text color (e.g., `"text-secondary"`)
 * @param children - React nodes to render inside the container
 * @returns A React element representing the styled container div
 */
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