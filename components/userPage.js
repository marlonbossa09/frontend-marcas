import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { updateProfile, getProfile } from "../services/userService";

// VISTA DE USUARIO ---> EDITAR USUARIO
export default function UserPage() {
  const authUser = useAuth("/signin");
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
 
  useEffect(() => {
    if (authUser) setUser(authUser);
  }, [authUser]);

  if (!user) return <p className="text-center mt-4">Cargando...</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await updateProfile(form);          
      const updatedUser = await getProfile(); 
      setUser(updatedUser);               
      setMessage("Perfil actualizado con éxito");
      setEditing(false);
    } catch (error) {
      setMessage("Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white text-center rounded-top-4">
          <h2 className="mb-0">Perfil de Usuario</h2>
        </div>

        <div className="card-body p-4">
          {!editing ? (
            <>
              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Nombre:</strong> {user.nombre} {user.apellido}
                </div>
                <div className="col-md-6">
                  <strong>Usuario:</strong> {user.username}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Correo:</strong> {user.correo}
                </div>
                <div className="col-md-6">
                  <strong>Celular:</strong> {user.celular}
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <h4 className="text-secondary">
                  Puede actualizar sus datos de manera opcional
                </h4>

                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  defaultValue={user.nombre}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  defaultValue={user.apellido}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  name="correo"
                  defaultValue={user.correo}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Celular</label>
                <input
                  type="text"
                  name="celular"
                  defaultValue={user.celular}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Actualizar contraseña</label>
                <input
                  type="text"
                  name="contraseña"
                  defaultValue={user.contraseña}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar Cambios"}
              </button>
            </form>
          )}
        </div>

        <div className="card-footer text-center">
          {!editing ? (
            <button
              className="btn btn-outline-primary px-4"
              onClick={() => setEditing(true)}
            >
              Editar Perfil
            </button>
          ) : (
            <button
              className="btn btn-outline-secondary px-4"
              onClick={() => setEditing(false)}
            >
              Cancelar
            </button>
          )}
        </div>

        {message && (
          <div className="alert alert-info text-center mt-3">{message}</div>
        )}
      </div>
    </motion.div>
  );
}
