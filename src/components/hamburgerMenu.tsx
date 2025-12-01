import { useState } from "react";

type HamburgerMenuProps = {
  onClick?: () => void;
  height?: number;
};

/**
 * Render a clickable hamburger menu icon that toggles its open/closed state and invokes an optional handler.
 *
 * @param onClick - Optional callback invoked each time the menu is clicked.
 * @param height - Height of the menu in pixels; defaults to `20`.
 * @returns A React element representing a responsive, three-line hamburger menu button whose line widths change when open.
 */
export default function HamburgerMenu({onClick, height = 20}: HamburgerMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
  return (
<div style={{ height: height ? `${height}px` : "100%" }} className={`aspect-square flex flex-col justify-between items-end cursor-pointer transition-all duration-300 [&>span]:rounded [&>span]:transition-all [&>span]:duration-300 [&>span]:bg-white`} onClick={() => { setIsOpen(!isOpen); if (onClick) onClick(); }}>
      <span style={{ height: `${Math.round(height/5)}px` }} className="w-full"></span>
      <span style={{ height: `${Math.round(height/5)}px` }} className={`${isOpen ? "w-1/2" : "w-full"}`}></span>
      <span style={{ height: `${Math.round(height/5)}px` }} className={`${isOpen ? "w-3/4" : "w-full"}`}></span>
    </div>
  );
}