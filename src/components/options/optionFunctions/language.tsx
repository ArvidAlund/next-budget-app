import { useState, useEffect } from "react";
import { emitEvent } from "@/app/lib/eventbus";

export default function LanguageOption() {
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Språk</h2>
                <p>Välj det språk du vill använda i appen.</p>
            </div>
            <select className="mt-2 p-2 border rounded w-full bg-primary text-secondary">
                <option value="sv">Svenska</option>
                <option value="en">English</option>
            </select>
        </div>
    );
}