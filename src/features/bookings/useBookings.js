import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";

function UseBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return { isLoading, bookings, error };
}

export default UseBookings;
