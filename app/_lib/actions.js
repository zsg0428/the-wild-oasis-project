'use server';

import {auth, signIn, signOut} from "@/app/_lib/auth";
import {supabase} from "@/app/_lib/supabase";
import {revalidatePath} from "next/cache";
import {getBookings} from "@/app/_lib/data-service";
import {redirect} from "next/navigation";

export const updateGuest = async (formData) => {
    const session = await auth()
    if (!session) throw new Error('You must be logged in')

    const nationalID = formData.get('nationalID')
    const [nationality, countryFlag] = formData.get('nationality').split('%')

    // test national ID length
    const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;
    if (!nationalIDRegex.test(nationalID)) throw new Error('Please provide a valid national ID ')

    const updateData = {nationality, countryFlag, nationalID}

    const {data, error} = await supabase
        .from("guests")
        .update(updateData)
        .eq("id", session.user.guestId)

    if (error) {
        throw new Error("Guest could not be updated");
    }

    revalidatePath('/account/profile')
}


// Delete booking server action

export const deleteBooking = async (bookingId) => {
    const session = await auth()
    if (!session) throw new Error('You must be logged in')

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id)

    if (!guestBookingIds.includes(bookingId)) throw new Error('You are not allowed to delete this bookings')

    const {error} = await supabase.from("bookings").delete().eq("id", bookingId);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }

    revalidatePath('/account/reservations')
}


export const updateBooking = async (formData) => {
    const session = await auth()
    if (!session) throw new Error('You must be logged in')

    // Verify if the user can edit this booking
    const guestBookings = await getBookings(session.user.guestId)
    const bookingIds = guestBookings.map(booking => booking.id)


    // getting data from the form
    const observations = formData.get('observations').slice(0, 1000)
    const reservationId = Number(formData.get('reservationId'))
    if (!bookingIds.includes(reservationId)) throw new Error('You are not allowed to edit this booking')
    const numGuests = formData.get('numGuests')
    const updatedFields = {observations, numGuests: parseInt(numGuests, 10)}
    const {data, error} = await supabase
        .from("bookings")
        .update(updatedFields)
        .eq("id", reservationId)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }
    revalidatePath(`/account/reservations`)

    revalidatePath(`/account/reservations/edit/${reservationId}`)
    redirect('/account/reservations')
}


export const createBooking = async (bookingData, formData) => {

    const session = await auth()
    if (!session) throw new Error('You must be logged in')

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        status: 'UNCONFIRMED',
        isPaid: false,
    }

    const {error} = await supabase
        .from("bookings")
        .insert([newBooking])


    if (error) {
        throw new Error("Booking could not be created");
    }

    revalidatePath(`cabins/${bookingData.cabinId}`)
    redirect('/cabins/thankyou')
}

export const signInAction = async () => {
    await signIn('google', {redirectTo: '/account'})
}


export const signOutAction = async () => {
    await signOut({redirectTo: '/'})
}