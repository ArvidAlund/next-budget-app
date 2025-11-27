import { emitEvent } from "@/app/lib/eventbus";

/**
 * Render a 3x4 numpad UI that emits a 'numpad-input' event when a button is pressed.
 *
 * @returns A JSX element containing a 3x4 grid of buttons labeled 1–9, 0, a delete key (⌫), and an ok key (✔).
 */
export default function Numpad() {
  const buttons = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "delete", "0", "ok"
  ];

  const handleClick = (value: string) => {
    emitEvent('numpad-input', value);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 max-w-xs mx-auto">
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => handleClick(btn)}
          className="bg-gray-200 rounded-lg py-6 text-xl font-semibold hover:bg-gray-300 active:bg-gray-400 transition text-black"
        >
          {btn === "delete" ? "⌫" : btn === "ok" ? "✔" : btn}
        </button>
      ))}
    </div>
  );
}