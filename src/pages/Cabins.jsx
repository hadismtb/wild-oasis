import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { useEffect } from "react";
import CabinTable from "../features/cabins/CabinTable.jsx";
import AddCabin from "../features/cabins/AddCabin.jsx";

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
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
