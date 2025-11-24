import { onEvent } from "@/app/lib/eventbus"
import { useEffect, useState } from "react"


export default function SendData(){

    return(
        <>
            <div className="p-4">
            
            </div>
            <div className="h-2 w-[90%] m-auto rounded-full overflow-hidden bg-gray-200">
                <div
                    className="bg-green-500 h-full transition-all duration-300"
                    style={{ width: `${(20 / 40) * 100}%` }}
                />
            </div>
        </>
    )
}