"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBooking, getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to update your profile");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const idPattern = /^[a-zA-Z0-9]{6,12}$/;
  if (!idPattern.test(nationalID)) {
    throw new Error(
      "National ID must be alphanumeric and between 6 and 12 characters long"
    );
  }

  const updateData = { nationality, nationalID, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  // Revalidate cached data and fetch the updated data on the client
  revalidatePath("/account/profile");

  return data;
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to delete a reservation");

  // Allow guests only to delete their own reservations
  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId))
    throw new Error("You are not authorized to delete this reservation");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");

  return data;
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to update a reservation");

  const bookingId = Number(formData.get("bookingId"));
  const booking = await getBooking(bookingId);

  // Allow guests only to update their own reservations
  if (booking.guestId !== session.user.guestId)
    throw new Error("You are not authorized to update this reservation");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 500);

  const updateData = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to create a reservation");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 500),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  if (
    !newBooking.numGuests ||
    newBooking.numGuests < 1 ||
    !typeof bookingData.cabinPrice === "number"
  ) {
    throw new Error("Invalid reservation data");
  }

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Reservation could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
