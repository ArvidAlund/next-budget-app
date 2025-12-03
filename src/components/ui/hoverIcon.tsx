import { LucideIcon } from "lucide-react";

interface HoverIconProps {
  Icon: LucideIcon;
  description: string;
}

export default function HoverIcon({ Icon, description }: HoverIconProps) {
  return (
    <div className="text-secondary group flex flex-col items-center">
        <Icon/>
        <span>{description}</span>
    </div>
  );
}
