import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { useEffect } from "react";
import CabinTable from "../features/cabins/CabinTable.jsx";

function Cabins() {
  // useEffect(() => {
  //   getCabins().then((data) => console.log(data));
  // }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
