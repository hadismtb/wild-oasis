import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// eslint-disable-next-line react/prop-types
function Filter({ filterField, options }) {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line react/prop-types
  const filterValue = searchParams.get(filterField) || options[0]?.value;

  const handleClick = (val) => {
    searchParams.set(filterField, val);
    setSearchParams(searchParams);
  };

  return (
    <StyledFilter>
      {/* eslint-disable-next-line react/prop-types */}
      {options.map((op) => (
        <FilterButton
          key={op.value}
          active={filterValue === op.value ? "active" : ""}
          disabled={filterValue === op.value}
          onClick={() => handleClick(op.value)}
        >
          {op.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
