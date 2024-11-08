import Stat from "./Stat.jsx";
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers.js";

// eslint-disable-next-line react/prop-types,no-unused-vars
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // eslint-disable-next-line react/prop-types
  const numBookings = bookings.length;

  // eslint-disable-next-line react/prop-types
  const sales = bookings.reduce((acc, cur) => cur.totalPrice + acc, 0);

  // eslint-disable-next-line react/prop-types
  const checkins = confirmedStays.length;

  // eslint-disable-next-line react/prop-types
  const occupation =
    // eslint-disable-next-line react/prop-types
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        color="indigo"
        value={checkins}
        icon={<HiOutlineCalendar />}
      />
      <Stat
        title="Occupancy rates"
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
