import { useState } from "react";
import Sidebar from "./Sidebar";
import MarcasPage from "../pages/marcas";
import UserPage from "./userPage"; 
import { useAuth } from "../hooks/useAuth";

export default function LayoutAuthenticated() {
  const [activePage, setActivePage] = useState("home");
  const user = useAuth("/signin");

  const renderContent = () => {
    switch (activePage) {
      case "marcas":
        return <MarcasPage />;
      case "perfil":
        return <UserPage />;
      default:
        const hora = new Date().getHours();
        let saludo = "Hola";

        if (hora >= 6 && hora < 12) {
          saludo = "🌅 Buenos días";
        } else if (hora >= 12 && hora < 19) {
          saludo = "☀️ Buenas tardes";
        } else {
          saludo = "🌙 Buenas noches";
        }

        return (
          <div className="container-fluid">
            <div className="mb-4">
              <h1 className="fw-bold">
                {saludo},{" "}
                <span className="text-primary">
                  {user?.nombre && user?.apellido
                    ? `${user.nombre} ${user.apellido}`
                    : "Usuario"}
                </span>
              </h1>
              <p className="text-muted">
                Bienvenido a tu panel de control. Aquí verás métricas y accesos rápidos.
              </p>
            </div>

            {/* Se definden los cards */}
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card shadow-sm border-0 h-100 hover-card">
                  <div className="card-body">
                    <h6 className="text-muted">Servicios Activos</h6>
                    <p className="display-6 fw-bold text-primary">12</p>
                    <p className="text-muted small">Última actualización: hoy</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 h-100 hover-card">
                  <div className="card-body">
                    <h6 className="text-muted">Último Acceso</h6>
                    <p className="fs-5 fw-semibold">{new Date().toLocaleString()}</p>
                    <span className="badge bg-primary">Sesión Activa</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 h-100 hover-card">
                  <div className="card-body">
                    <h6 className="text-muted">Rol</h6>
                    <p className="fs-4 fw-semibold text-dark">{user?.rol || "Usuario"}</p>
                    <div className="progress mt-2" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "75%" }}
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla para complementar vista -> actividades */}
            <div className="card mt-5 shadow-sm border-0">
              <div className="card-header bg-white fw-bold border-bottom">
                Últimas Actividades
              </div>
              <div className="card-body">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Fecha</th>
                      <th>Acción</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2025-08-23</td>
                      <td>Registro de Marca</td>
                      <td><span className="badge bg-success">Completado</span></td>
                    </tr>
                    <tr>
                      <td>2025-08-20</td>
                      <td>Actualización de Perfil</td>
                      <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                    </tr>
                    <tr>
                      <td>2025-08-18</td>
                      <td>Cambio de Configuración</td>
                      <td><span className="badge bg-primary">Exitoso</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onNavigate={setActivePage} />
      <main style={{ flex: 1, padding: "20px", background: "#f8f9fa" }}>
        {renderContent()}
      </main>
    </div>
  );
}
