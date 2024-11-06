import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext.jsx";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const imageSource = isDarkMode
    ? "../../public/logo-dark.png"
    : "../../public/logo-light.png";

  return (
    <StyledLogo>
      <Img src={imageSource} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
