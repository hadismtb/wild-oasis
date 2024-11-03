import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings.js";
import { useParams } from "react-router-dom";

function UseBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { booking, isLoading, error };
}

export default UseBooking;
