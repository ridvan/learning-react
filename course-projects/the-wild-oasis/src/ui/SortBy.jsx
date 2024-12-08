import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from "prop-types";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={selectedSortBy}
    />
  );
}
SortBy.propTypes = {
  options: PropTypes.array.isRequired,
};

export default SortBy;
