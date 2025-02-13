import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/authSlice";
import { decodeJwtToken } from "../../utils/decoder";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavigationBar() {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userToken) {
      const decoded = decodeJwtToken(userToken);
      setDecodedToken(decoded);
    } else {
      setDecodedToken(null);
    }
  }, [userToken]);

  useEffect(() => {
    if (!userToken && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [userToken, navigate, location]);

  const handleLogout = () => {
    dispatch(logout());
    setDecodedToken(null);
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Secret Santa
          </Navbar.Brand>
          <Nav className="me-auto">
            {decodedToken?.iss === "admin" && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {userToken ? (
              <>
                <Navbar.Text className="text-info">Signed in as: {decodedToken?.sub}</Navbar.Text>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
