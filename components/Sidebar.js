import { useState } from "react";
import { ArrowLeft, User, Settings, Briefcase, LogOut } from "lucide-react";
import styles from "../styles/styles.module.css";

export default function Sidebar({ onNavigate }) {
  const [activeMenu, setActiveMenu] = useState(null);

  // cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/signin";
  };

  const mainMenu = (
    <ul className={styles.menuList}>
      <li onClick={() => setActiveMenu("Servicios")}>
        <Briefcase size={18} /> <span>Servicios</span>
      </li>
      <li onClick={() => setActiveMenu("User")}>
        <User size={18} /> <span>Usuario</span>
      </li>
      <li onClick={handleLogout}>
        <LogOut size={18} color="red" /> <span style={{ color: "red" }}>Cerrar sesión</span>
      </li>
    </ul>
  );

  const subMenus = {
    Servicios: (
      <div>
        <div
          className={styles.subHeader}
          onClick={() => {
            setActiveMenu(null);
            onNavigate("home");
          }}
        >
          <ArrowLeft size={20} /> <span>Volver</span>
        </div>
        <ul className={styles.menuList}>
          <li onClick={() => onNavigate("marcas")}>Registro de Marca</li>
        </ul>
      </div>
    ),
    User: (
      <div>
        <div
          className={styles.subHeader}
          onClick={() => {
            setActiveMenu(null);
            onNavigate("home");
          }}
        >
          <ArrowLeft size={20} /> <span>Volver</span>
        </div>
        <ul className={styles.menuList}>
          <li onClick={() => onNavigate("perfil")}>
            <User size={18} /> <span>Perfil</span>
          </li>
          <li onClick={handleLogout}>
            <LogOut size={18} color="red" />{" "}
            <span style={{ color: "red" }}>Cerrar sesión</span>
          </li>
        </ul>
      </div>
    ),
  };

  return (
    <>
      {/* RESPONSIVE */}
      <button
        className="btn btn-dark d-md-none m-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
        aria-controls="sidebarOffcanvas"
      >
        ☰
      </button>

      {/* SIDEBAR PARA RESPONSIVE */}
      <div
        className={`offcanvas offcanvas-start ${styles.sidebar}`}
        tabIndex="-1"
        id="sidebarOffcanvas"
      >
        <div className="offcanvas-header">
          <h5 className={`${styles.logo} offcanvas-title`}>Dashboard</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          {activeMenu ? subMenus[activeMenu] : mainMenu}
        </div>
      </div>

      {/* PANTALLAS GRANDES */}
      <aside className={`d-none d-md-flex flex-column ${styles.sidebar}`}>
        <h2 className={styles.logo}>Dashboard</h2>
        <nav>{activeMenu ? subMenus[activeMenu] : mainMenu}</nav>
      </aside>
    </>
  );
}
