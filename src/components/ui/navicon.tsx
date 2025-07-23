import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

type NavItemProps = {
  icon: IconDefinition,
  label: string,
  color?: string,
  bgcolor?:string
}

export function NavIcon({ icon, label, color="text-amber-500", bgcolor="transparent" }: NavItemProps) {              
  return (
    <div
      className="relative flex flex-col items-center justify-center group h-full"
    >
      <FontAwesomeIcon icon={icon} className={`text-3xl p-1 rounded-md ${color} ${bgcolor}`}/>

      {/* Tooltip / text on hover */}
      <span
        className="
          absolute bottom-full mb-2 px-2 py-1 rounded text-xs text-white bg-black opacity-0
          group-hover:opacity-100 transition-opacity
          whitespace-nowrap pointer-events-none
        "
      >
        {label}
      </span>
    </div>
  )
}
