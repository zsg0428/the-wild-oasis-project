"use client"
import ReservationCard from "@/app/_components/ReservationCard";
import {useOptimistic} from 'react'
import {deleteBooking, deleteReservation} from "@/app/_lib/actions";

const ReservationList = ({bookings}) => {

    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (curBookings, bookingId) => {
        return curBookings.filter(booking => booking.id !== bookingId)
    });

    async function handleDelete(bookingId) {
        optimisticDelete(bookingId);
        await deleteBooking(bookingId)
    }

    return <ul className="space-y-6">
        {optimisticBookings.map((booking) => (
            <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id}/>
        ))}
    </ul>
}

export default ReservationList