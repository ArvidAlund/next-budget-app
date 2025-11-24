import { useState, useEffect } from "react";
import { emitEvent } from "@/app/lib/eventbus";


/**
 * Renders a two-column UI for entering an initial account amount and keeps that value in component state.
 *
 * Emits a 'Start-Income' event on the app event bus whenever the entered amount changes, passing the current numeric value or `undefined`.
 *
 * @returns The component's JSX element containing the labeled numeric input and descriptive text.
 */
export default function AddInitalAmount(){
    const [startAmount, setStartAmount] = useState<number>()

    useEffect(()=>{
        emitEvent('Start-Income', startAmount)
    },[startAmount])
    return(
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
                  <div className="sm:w-3/4">
                    <h2 className="text-xl font-semibold mb-2">Ange Startsumma</h2>
                    <p>Ange hur mycket pengar du har på ditt konto när du börjar.</p>
                  </div>
            
                  <div className="flex flex-col justify-center items-center gap-6">
                    <label>
                        <p>Summa*:</p>
                        <input type="number" name="Start Sum" placeholder="Summa..." className='border p-1 rounded h-10 w-full' value={startAmount} onChange={(e) => setStartAmount(parseInt(e.target.value))} required/>
                    </label>
                  </div>
                </div>
              
    );
}