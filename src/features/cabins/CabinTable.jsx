import styled from "styled-components";
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import useCabin from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty.jsx";

// eslint-disable-next-line no-unused-vars
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { isLoading, cabins = [] } = useCabin();
  const [searchParams] = useSearchParams();

  // 1. FILTER
  const filterValue = searchParams.get("discount") || "all";
  const filteredCabins =
    filterValue === "no-discount"
      ? cabins.filter((c) => c.discount === 0)
      : filterValue === "with-discount"
      ? cabins.filter((c) => c.discount > 0)
      : cabins;

  // 2. SORT
  const sortValue = searchParams.get("sort") || "startDate-asc";
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="Bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
export default CabinTable;
