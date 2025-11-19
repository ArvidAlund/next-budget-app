import { useState, useEffect } from "react";
import { emitEvent, onEvent } from "@/app/lib/eventbus";
import saveChangesToDb from "@/app/lib/db/saveChanges";
import { JSONSchema } from "openai/lib/jsonschema.js";

interface UnsavedChanges {
  language?: string;
  currency?: string;
  time_format?: string;
  auto_backup?: boolean;
  month_start_day?: number;
  allow_import_export?: boolean;
  theme?: string;
  reset_allowed?: boolean;
  accent_color?: string;
  compact_view?: boolean;
  show_decimals?: boolean;
  show_charts?: boolean;
  show_category_icons?: boolean;
  font_size?: string;
  calendar_view?: string;
  week_start_day?: string;
  highlight_recurring?: boolean;
  payday_day?: number;
  bill_reminders?: boolean;
  bill_notifications?: boolean;
  budget_thresholds?: number;
  summary_frequency?: string;
  push_notifications?: boolean;
  silent_mode?: boolean;
  sync_error_notifications?: boolean;
  data_sharing?: string;
  allow_analytics?: boolean;
  storage_type?: string;
  clear_sensitive?: boolean;
  privacy_report?: boolean;
  app_lock?: string;
  auto_lock_minutes?: number;
  encrypt_local?: boolean;
  pin_code?: string;
  emergency_access?: string;
  account_provider?: string;
  backup_sync?: boolean;
  cloud_import?: boolean;
  cloud_export?: boolean;
  logout_allowed?: boolean;
  delete_account?: boolean;
  budget_period?: string;
  carryover?: boolean;
  recurring_transactions?: boolean;
  auto_categorization?: string;
  transaction_signs?: boolean;
  transaction_decimals?: boolean;
  thousand_separator?: string;
  default_category?: string;
  hide_small_amounts?: boolean;
  allow_future_transactions?: boolean;
  custom_categories?: JSONSchema;
  category_settings?: JSONSchema;
  category_order?: JSONSchema;
}

interface UnsavedDetails {
  [key: string]: string | number | boolean;
}

/**
 * Manage and persist a collection of unsaved settings via event-driven updates.
 *
 * The hook maintains a map of pending changes and a boolean flag that triggers persistence.
 * It listens for "unsaved-changes" events to merge incoming details into the map and
 * for "remove-unsaved-changes" events to remove specified keys. When the returned
 * `setSaveChanges(true)` is called, the current changes are persisted to the database,
 * the map is cleared, a "general-changes-saved" event is emitted, and the page is reloaded.
 *
 * @returns An object containing:
 * - `unsavedChanges`: the current map of pending changes.
 * - `setUnsavedChanges`: setter to replace or merge pending changes.
 * - `saveChanges`: boolean flag indicating whether a save has been requested.
 * - `setSaveChanges`: setter used to trigger persistence when set to `true`.
 */
export function useUnsavedChanges() {
  const [unsavedChanges, setUnsavedChanges] = useState<UnsavedChanges>({});
  const [saveChanges, setSaveChanges] = useState(false);

  // När saveChanges blir true → spara till DB
  useEffect(() => {
    if (!saveChanges) return;

    const performSave = async () => {
      try {
        await saveChangesToDb(
          unsavedChanges as Record<string, string | number | boolean>
        );
        setUnsavedChanges({});
        emitEvent("general-changes-saved");
        window.location.reload();
      } catch (error) {
        console.error("Error saving changes:", error);
      } finally {
        setSaveChanges(false);
      }
    };

    performSave();
  }, [unsavedChanges, saveChanges]);

  // Lyssna på events för att lägga till/ta bort osparade ändringar
  useEffect(() => {
    const handleUnsavedChanges = onEvent<UnsavedDetails>(
      "unsaved-changes",
      (details) => {
        setUnsavedChanges((prev) => ({ ...prev, ...details }));
      }
    );

    const handleRemoveUnsavedChanges = onEvent<UnsavedDetails>(
      "remove-unsaved-changes",
      (details) => {
        setUnsavedChanges((prev) => {
          const updated = { ...prev };
          for (const key in details) {
            delete updated[key as keyof UnsavedChanges];
          }
          return updated;
        });
      }
    );

    return () => {
      handleUnsavedChanges();
      handleRemoveUnsavedChanges();
    };
  }, []);

  return {
    unsavedChanges,
    setUnsavedChanges,
    saveChanges,
    setSaveChanges,
  };
}