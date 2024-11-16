"use client"
import {createContext, useContext, useState} from "react";
const ReservationContext = createContext()

const initialState = {from: undefined, to: undefined}
function ReservationProvider ({children}) {
    const [range, setRange] = useState(initialState)
    const handleResetRange = ()=> setRange(initialState)
    return <ReservationContext.Provider value={{range, setRange, resetRange: handleResetRange}}>
        {children}
    </ReservationContext.Provider>

}

function useReservation () {
    const context = useContext(ReservationContext)
    if (context === undefined) throw new Error('Context was used outside provider')
    return context
}

export {ReservationProvider, useReservation}