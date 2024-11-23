import {getBooking, getCabin} from "@/app/_lib/data-service";
import {updateBooking} from "@/app/_lib/actions";
import UpdateReservationButton from "@/app/_components/UpdateReservationButton";
import SubmitButton from "@/app/_components/UpdateReservationButton";

export default async function Page({params}) {
    const reservationId = params.id
    const bookingData = await getBooking(reservationId)
    const {maxCapacity}
        = await getCabin(bookingData.cabinId)


    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Edit Reservation #{reservationId}
            </h2>

            <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
                  action={updateBooking}>

                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        name="numGuests"
                        id="numGuests"
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                        required
                        defaultValue={bookingData.numGuests}
                    >
                        <option value="" key="">
                            Select number of guests...
                        </option>
                        {Array.from({length: maxCapacity}, (_, i) => i + 1).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="observations">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations"
                        defaultValue={bookingData.observations}
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                    />
                    <input type="hidden" value={reservationId} name='reservationId'/>
                </div>

                <div className="flex justify-end items-center gap-6">
                    <SubmitButton text='Updating Reservation..'>Update Reservation</SubmitButton>
                </div>
            </form>
        </div>
    );
}


