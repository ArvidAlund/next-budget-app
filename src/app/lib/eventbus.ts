// utils/eventBus.ts

/**
 * Enkel event-bus baserad på EventTarget.
 * Används för att skicka och lyssna på globala events i spelet/applikationen.
 */
const eventBus = new EventTarget();

/**
 * Dispatches a CustomEvent with the given name on the global event bus.
 *
 * @param name - The event name to dispatch.
 * @param detail - Optional payload delivered as the CustomEvent's `detail` property.
 */
export function emitEvent<T>(name: string, detail?: T): void {
  eventBus.dispatchEvent(new CustomEvent<T>(name, { detail }));
}

/**
 * Subscribes to a named event and invokes the handler with the event's detail.
 *
 * @param name - The event name to listen for.
 * @param handler - Callback invoked with the event's `detail` payload when the event is dispatched.
 * @returns A function that removes the registered listener.
 * @throws Error if `handler` is not a function.
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
