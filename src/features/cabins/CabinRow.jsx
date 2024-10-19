import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil, HiTrash } from "react-icons/hi";
import useCreateCabin from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

// eslint-disable-next-line react/prop-types
function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  // eslint-disable-next-line react/prop-types
  const {
    // eslint-disable-next-line react/prop-types
    name,
    // eslint-disable-next-line react/prop-types
    image,
    // eslint-disable-next-line react/prop-types
    maxCapacity,
    // eslint-disable-next-line react/prop-types
    regularPrice,
    // eslint-disable-next-line react/prop-types
    discount,
    // eslint-disable-next-line react/prop-types
    id: cabinId,
    // eslint-disable-next-line react/prop-types
    description,
  } = cabin;

  const handleDuplicateCabin = () => {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  };

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span style={{ textAlign: "center" }}>&mdash;</span>
      )}
      <div>
        <button disabled={isCreating} onClick={handleDuplicateCabin}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit-cabin">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>

          <Modal.Window name="edit-cabin">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="delete-cabin">
            <button disabled={isDeleting}>
              <HiTrash />
            </button>
          </Modal.Open>

          <Modal.Window name="delete-cabin">
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
              resourceName="cabins"
            />
          </Modal.Window>
        </Modal>
        {/*<button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>*/}
        {/*  <HiTrash />*/}
        {/*</button>*/}
      </div>
    </TableRow>
  );
}

export default CabinRow;
