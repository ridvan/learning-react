import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getBookings, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const session = await auth();
  const reservationId = Number(params.reservationId);

  const userReservations = await getBookings(session.user.guestId);
  const currentBooking = userReservations.find(
    (booking) =>
      booking.guestId === session.user.guestId && booking.id === reservationId
  );

  if (!currentBooking) {
    throw new Error(
      "Reservation not found or you are not authorized to edit it"
    );
  }

  const booking = await getBooking(reservationId);
  const cabinId = booking.cabinId;

  const cabin = await getCabin(cabinId);
  const maxCapacity = cabin.maxCapacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={booking.numGuests}
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
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
            defaultValue={booking.observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <input type="hidden" name="bookingId" value={reservationId} />

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">Update Profile</SubmitButton>
        </div>
      </form>
    </div>
  );
}
