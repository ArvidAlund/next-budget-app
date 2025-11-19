import { useEffect, useState } from "react";
import { emitEvent } from "@/app/lib/eventbus";
import getUserOption from "@/app/lib/db/getUserOption";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    border: "1px solid #ccc",
    marginBottom: "8px",
    background: "var(--color-primary)",
    color: "var(--color-secondary)",
    borderRadius: "6px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
}

// Hjälpfunktion för att konvertera id till sträng
const toStringId = (id: UniqueIdentifier): string => String(id);

export default function SortCategoriesOption() {
  const [sortCategories, setSortCategories] = useState<string[]>([]);
  const [userSortCategories, setUserSortCategories] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchSortCategories = async () => {
      try {
        const userSortCategories = await getUserOption("category_order");
        if (Array.isArray(userSortCategories)) {
          setSortCategories(userSortCategories);
          setUserSortCategories(userSortCategories);
          setLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching sort categories option:", error);
      }
    };

    fetchSortCategories();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (!userSortCategories) return;

    const arraysEqual =
      sortCategories.length === userSortCategories.length &&
      sortCategories.every((val, idx) => val === userSortCategories[idx]);

    if (arraysEqual) {
      emitEvent("remove-unsaved-changes", { category_order: sortCategories });
    } else {
      emitEvent("unsaved-changes", { category_order: sortCategories });
    }
  }, [sortCategories, userSortCategories, loaded]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = toStringId(active.id);
    const overId = toStringId(over.id);

    if (activeId !== overId) {
      setSortCategories((items) => {
        const oldIndex = items.indexOf(activeId);
        const newIndex = items.indexOf(overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="p-4 grid gap-2 items-center">
      <div className="w-full text-center">
        <h2 className="text-xl font-semibold mb-2">Sortera Kategorier</h2>
        <p>Dra och släpp för att ändra ordningen.</p>
      </div>
      {loaded ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortCategories}
            strategy={verticalListSortingStrategy}
          >
            {sortCategories.map((category) => (
              <div key={category} className="capitalize relative">
                <SortableItem id={category} />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <p className="w-full text-center">Laddar...</p>
      )}
    </div>
  );
}
