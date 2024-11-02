import Select from "./Select.jsx";
import { useSearchParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort") || "";

  const handleChange = (e) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={sortValue}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
