import gsap from "gsap";
import { useRef, useEffect } from "react";

type TransactionsTableMenuProps = {
  menuOpen: boolean;
  activeOptions: string[];
  setActiveOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

/**
 * Render a collapsible transactions filter menu with animated open/close behavior.
 *
 * Renders controls to filter transactions by month range and transaction type, and a button to clear all filters. The menu animates its height and opacity when opened or closed.
 *
 * @param menuOpen - Whether the menu is visible.
 * @param activeOptions - Array of active filter option keys (e.g. "income", "expense", "recurring", "1", "3", "all").
 * @param setActiveOptions - State updater to replace the activeOptions array.
 * @returns The rendered filter menu element when `menuOpen` is true, otherwise `null`.
 */
export function TransactionsTableMenu({
  menuOpen,
  activeOptions,
  setActiveOptions,
}: TransactionsTableMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else if (menuRef.current) {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [menuOpen]);

  // Hjälpfunktion för att toggla en option
  const toggleOption = (option: string) => {
    setActiveOptions(prev =>
      prev.includes(option)
        ? prev.filter(opt => opt !== option)
        : [...prev, option]
    );
  };

  return (
    <>
      {menuOpen && (
        <div
          ref={menuRef}
          className="w-full mt-2 flex flex-col gap-4 mb-4 overflow-hidden text-white border-b-2 border-gray-600 p-3 rounded-lg bg-gray-800"
        >
          {/* Filter på månader */}
          <div className="flex flex-col gap-2">
            <h4 className="w-full text-center mb-2 text-lg font-bold">Antal månader tillbaka</h4>
            <select
              className="bg-primary p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => {
                const value = e.target.value;
                setActiveOptions(prev => {
                  const filtered = prev.filter(opt => !["0","1","3","6","12","all"].includes(opt));
                  return value === "all" ? [...filtered, "all"] : [...filtered, value];
                });
              }}
              value={activeOptions.find(opt => ["0","1","3","6","12","all"].includes(opt)) ?? "0"}
            >
              <option value="0">Aktiv månad</option>
              <option value="1">1 månad</option>
              <option value="3">3 månader</option>
              <option value="6">6 månader</option>
              <option value="12">12 månader</option>
              <option value="all">Alla</option>
            </select>
          </div>

          {/* Filter på typ av transaktion */}
          <div className="flex gap-2 flex-wrap">
            <h4 className="w-full text-center mb-2 text-lg font-bold">Typ av transaktion</h4>
            <button
              className={`flex-1 p-2 rounded font-semibold transition-all duration-300 ${
                activeOptions.includes("income")
                  ? "bg-green-500 text-white"
                  : "bg-gray-600 text-gray-200 hover:bg-green-400"
              }`}
              onClick={() => toggleOption("income")}
            >
              Inkomst
            </button>
            <button
              className={`flex-1 p-2 rounded font-semibold transition-all duration-300 ${
                activeOptions.includes("expense")
                  ? "bg-red-500 text-white"
                  : "bg-gray-600 text-gray-200 hover:bg-red-400"
              }`}
              onClick={() => toggleOption("expense")}
            >
              Utgift
            </button>
            <button
              className={`flex-1 p-2 rounded font-semibold transition-all duration-300 ${
                activeOptions.includes("recurring")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-600 text-gray-200 hover:bg-blue-400"
              }`}
              onClick={() => toggleOption("recurring")}
            >
              Återkommande
            </button>
          </div>

          {/* Rensa filter */}
          <div className="flex justify-end">
            <button
              onClick={() => setActiveOptions([])}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm font-semibold transition-all duration-300"
            >
              Rensa filter
            </button>
          </div>
        </div>
      )}
    </>
  );
}