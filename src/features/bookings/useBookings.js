import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants.js";

function UseBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    filterValue === "all" || !filterValue
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortValue = searchParams.get("sort") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sort = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  // PREFETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}

export default UseBookings;
