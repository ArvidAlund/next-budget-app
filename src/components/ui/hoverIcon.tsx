import { LucideIcon } from "lucide-react";

interface HoverIconProps {
  Icon: LucideIcon;
  description: string;
}

/**
 * Renders an icon with a centered description below it.
 *
 * @param Icon - Lucide icon component to render
 * @param description - Text label displayed beneath the icon
 * @returns A vertically stacked, centered container with the icon and its description
 */
export default function HoverIcon({ Icon, description }: HoverIconProps) {
  return (
    <div className="text-secondary group flex flex-col items-center">
        <Icon/>
        <span>{description}</span>
    </div>
  );
}