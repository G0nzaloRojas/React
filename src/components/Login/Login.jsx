import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error en el login:", err.code);
      setError("Credenciales incorrectas. Verificá tu correo y contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "420px" }}>
        <div className="text-center mb-3">
          <FaLock size={30} className="text-primary mb-2" />
          <h2>Acceso Administrador</h2>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
            aria-label="Ingresar al panel de administración"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Link to="/" className="text-decoration-none">
            <FaArrowLeft className="me-1" /> Volver a la tienda
          </Link>
        </div>
      </Card>
    </Container>
  );
};