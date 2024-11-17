import {getBookedDatesByCabinId, getSettings} from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import {auth} from "@/app/_lib/auth";
import LoginMessage from "@/app/_components/LoginMessage";

async function Reservation({cabinData}) {
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabinData.id),
    ]);

    const session = await auth()
    return (
        <div className="grid grid-cols-2 items-center border border-primary-800 min-h-[400px]">
            <DateSelector
                settings={settings}
                bookedDates={bookedDates}
                cabinData={cabinData}
            />
            {session?.user ? <ReservationForm cabinData={cabinData} user={session.user}/> : <LoginMessage/>}

        </div>
    );
}

export default Reservation;
