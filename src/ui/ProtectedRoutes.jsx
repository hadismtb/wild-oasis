import useUser from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function ProtectedRoutes({ children }) {
  const FullPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-grey-50);
  `;
  const navigate = useNavigate();
  // 1.load authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2.redirect user to login page if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
      window.location.reload();
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3.show spinner while loading user
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4.if user authenticated render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoutes;
