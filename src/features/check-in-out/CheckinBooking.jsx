import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import useCheckin from "./useCheckin.js";
import useSettings from "../settings/useSettings.js";

// eslint-disable-next-line no-unused-vars
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();
  const { checkin, isCheckin } = useCheckin();
  // eslint-disable-next-line no-unused-vars
  const { settings, isLoading: settingsLoading } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
    setAddBreakfast(booking?.hasBreakfast ?? false);
  }, [booking]);

  if (isLoading || settingsLoading) return <Spinner />;

  const {
    id: bookingId,
    // eslint-disable-next-line no-unused-vars
    guests,
    // eslint-disable-next-line no-unused-vars
    totalPrice,
    // eslint-disable-next-line no-unused-vars
    numGuests,
    // eslint-disable-next-line no-unused-vars
    hasBreakfast,
    // eslint-disable-next-line no-unused-vars
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numNights;

  function handleCheckin() {
    if (!confirmedPaid) return;

    if (!addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            disabled={hasBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmedPaid}
          id={"confirm"}
          disabled={isCheckin}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests.fullName} has paid the total of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice,
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmedPaid || isCheckin} onClick={handleCheckin}>
          {isCheckin ? "Checking ..." : `Check in booking #${bookingId}`}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
