
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import {useReservation} from "@/app/_components/ReservationContext";

async function Reservation({ cabinData }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabinData.id),
  ]);
  return (
    <div className="grid grid-cols-2 items-center border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabinData={cabinData}
      />
      <ReservationForm cabinData={cabinData} />
    </div>
  );
}

export default Reservation;
