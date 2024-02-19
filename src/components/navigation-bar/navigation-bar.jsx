import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";
export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-link">
                  Profile
                </Nav.Link>
                <Button
                  variant="outline-primary"
                  onClick={onLoggedOut}
                  className="logout-button"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-1">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link-2">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
