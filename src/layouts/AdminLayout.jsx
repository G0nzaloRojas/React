import { Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaSignOutAlt, FaStore, FaPlus, FaList } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/admin/dashboard">
            Panel Admin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar" />
          <Navbar.Collapse id="admin-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin/dashboard">
                <FaList className="me-1" /> Productos
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/products/new">
                <FaPlus className="me-1" /> Nuevo Producto
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                <FaStore className="me-1" /> Ver Tienda
              </Nav.Link>
            </Nav>
            <div className="d-flex align-items-center gap-3">
              <span className="text-light small">{user?.email}</span>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" /> Cerrar Sesión
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4 flex-grow-1">
        <Outlet />
      </Container>
    </div>
  );
};