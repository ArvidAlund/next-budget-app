// utils/eventBus.ts

/**
 * Enkel event-bus baserad på EventTarget.
 * Används för att skicka och lyssna på globala events i spelet/applikationen.
 */
const eventBus = new EventTarget();

/**
 * Skickar ett event med ett namn och valfri data.
 *
 * @param name - Namnet på eventet.
 * @param detail - Data som ska skickas med eventet (valfritt).
 *
 * Exempel:
 * emitEvent("jump-start");
 * emitEvent("EnterHouse", { playerId: 1 });
 */
export function emitEvent<T>(name: string, detail?: T): void {
  eventBus.dispatchEvent(new CustomEvent<T>(name, { detail }));
}

/**
 * Lyssnar på ett event med ett specifikt namn.
 *
 * @param name - Namnet på eventet att lyssna på.
 * @param handler - Callback som körs när eventet triggas.
 * @returns Funktion för att avregistrera event-lyssnaren.
 *
 * Exempel:
 * const unsubscribe = onEvent("jump-start", () => console.log("Player started jumping"));
 * unsubscribe(); // när du vill sluta lyssna
 */
export function onEvent<T>(
  name: string,
  handler: (detail: T) => void
): () => void {
  if (typeof handler !== "function") {
    throw new Error("Handler måste vara en funktion");
  }

  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<T>;
    handler(customEvent.detail);
  };

  eventBus.addEventListener(name, listener);

  return () => eventBus.removeEventListener(name, listener);
}

