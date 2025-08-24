import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import { signup } from "../services/authService";

export default function SignUp() {
  const router = useRouter();
  const [state, setState] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    correo: "",
    celular: "",
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(state);
      alert("Usuario registrado con éxito");
      router.push("/signin");
    } catch {
      alert("Error en el registro. Intenta de nuevo.");
    }
  }

  return (
    <>
      <Layout>
        <div className="bg-dark text-light d-flex justify-content-center align-items-center vh-100">
          <div
            className="card shadow-lg p-4"
            style={{ width: "400px", background: "#2c2c2c" }}
          >
            <h2 className="text-light text-center mb-3 fw-bold">Registro</h2>
            <p className="text-center text-secondary mb-4">Completa los datos para crear tu cuenta</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Usuario"
                  value={state.username}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={state.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={state.nombre}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="apellido"
                  className="form-control"
                  placeholder="Apellido"
                  value={state.apellido}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  placeholder="Correo"
                  value={state.correo}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="celular"
                  className="form-control"
                  placeholder="Celular"
                  value={state.celular}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              <button type="submit" className="btn btn-light w-100 fw-bold">
                Registrarme
              </button>
            </form>

            <p className="text-center text-secondary mt-3">
              ¿Ya tienes cuenta?{" "}
              <Link href="/signin" className="text-light fw-bold">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
