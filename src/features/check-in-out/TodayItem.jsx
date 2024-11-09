import styled from "styled-components";
import Tag from "../../ui/Tag.jsx";
import { Flag } from "../../ui/Flag.jsx";
import Button from "../../ui/Button.jsx";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton.jsx";

// eslint-disable-next-line no-unused-vars
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

// eslint-disable-next-line no-unused-vars
const Guest = styled.div`
  font-weight: 500;
`;

// eslint-disable-next-line react/prop-types
function TodayItem({ activity }) {
  // eslint-disable-next-line react/prop-types,no-unused-vars
  const { id, guests, numNights, status } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      {/* eslint-disable-next-line react/prop-types */}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />

      {/* eslint-disable-next-line react/prop-types */}
      <Guest>{guests.fullName}</Guest>

      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
