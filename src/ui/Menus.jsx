import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick.js";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
// eslint-disable-next-line no-unused-vars
const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;
// eslint-disable-next-line no-unused-vars
const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

// eslint-disable-next-line no-unused-vars
const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

// eslint-disable-next-line react/prop-types
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// eslint-disable-next-line react/prop-types
function Toggle({ id }) {
  const { open, close, openId, setPosition } = useContext(MenusContext);

  const clickHandler = (e) => {
    const rect = e.target.closest("button").getBoundingClientRect();

    if (openId === id) return close();
    open(id);
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  };

  return (
    <StyledToggle onClick={clickHandler}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

// eslint-disable-next-line react/prop-types
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);

  const ref = useOutsideClick(close, true);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

// eslint-disable-next-line react/prop-types
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon || ""}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
