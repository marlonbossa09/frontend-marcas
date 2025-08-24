import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from '../components/layout';
import { login } from "../services/authService";

export default function SignIn() {
  const router = useRouter();
  const [state, setState] = useState({ username: "admin", password: "123456" });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { access_token } = await login(state);
      localStorage.setItem("access_token", access_token);
      router.push("/home");
    } catch {
      alert("Credenciales inválidas. Intenta de nuevo.");
    }
  }

  return (
    <>
      <Layout>
        <div className="container-fluid bg-dark text-light d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <div className="text-center mb-4">
              <h1 className="fw-bold">Iniciar Sesión</h1>
              <p className="text-secondary">
                Accede con tus credenciales para continuar
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-secondary rounded shadow-lg p-4"
            >
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Ingresa tu usuario"
                  value={state.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-light text-dark w-100 py-2 fw-bold shadow-sm"
              >
                Ingresar
              </button>
            </form>

            <div className="text-center mt-3">
              <p className="text-secondary">
                ¿No tienes cuenta?{" "}
                <Link href="/signup" className="text-light fw-bold">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
