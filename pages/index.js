import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Home() {
  return (
    <>
      
      <Layout>
        <div className="container-fluid bg-dark text-light d-flex flex-column justify-content-center align-items-center vh-100">
          
          <div className="text-center">
            <h1 className="fw-bold mb-3 display-4">
              Bienvenido
            </h1>
            <p className="text-secondary mb-4 fs-5">
              Accede o crea tu cuenta para continuar
            </p>

            <div className="d-grid gap-3 col-12 col-md-6 mx-auto">
              <Link href="/signup" className="btn btn-outline-light btn-lg py-2 shadow-sm">
                <i className="bi bi-person-plus me-2"></i> Registrarse
              </Link>
              <Link href="/signin" className="btn btn-light btn-lg text-dark py-2 shadow-sm">
                <i className="bi bi-box-arrow-in-right me-2"></i> Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
