import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Option = {
  value: string
  label: string
}

type ComboBoxProps = {
  options: Option[]
  placeholder?: string
  value: string
  onChange: (value: string) => void
  label?: string
}

export function ComboBox({
  options,
  placeholder = "Välj...",
  value,
  onChange,
  label,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium text-sm">{label}</label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-solid border-2 bg-primary"
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-85 p-0 bg-white text-black border border-black-200" onFocus={(e) => e.preventDefault()}>
          <Command className="">
            <CommandInput placeholder="Sök..." className="h-9 text-black" autoFocus={false}/>
            <CommandList>
              <CommandEmpty>Inget hittades.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    className="text-black hover:bg-gray-100"

                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4 text-black",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
