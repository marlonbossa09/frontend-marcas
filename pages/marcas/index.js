import { useEffect, useState, useRef } from "react";
import { getAllMarcas, deleteMarca, updateMarca } from "../../services/marcaService";

import WizardForm from "../../components/WizardForm";

export default function MarcasPage() {
  const [marcas, setMarcas] = useState([]);
  const [editMarca, setEditMarca] = useState(null);
  const [showWizard, setShowWizard] = useState(false);
  

  // Para eliminar
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [marcaToDelete, setMarcaToDelete] = useState(null);

  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      load();
      fetched.current = true;
    }
  }, []);

  async function load() {
    try {
      const data = await getAllMarcas();
      setMarcas(data);
    } catch (e) {
      console.error(e);
    }
  }

  function handleDelete(id) {
    setMarcaToDelete(id);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (marcaToDelete) {
      await deleteMarca(marcaToDelete);
      load();
      setShowDeleteModal(false);
      setMarcaToDelete(null);
    }
  }

  function validarEdicion(marca) {
  if (marca.nombre.trim().length < 3 || marca.nombre.trim().length > 30) {
    alert("El nombre de la marca debe tener entre 3 y 30 caracteres.");
    return false;
  }
  if (marca.titular.trim().length < 3 || marca.titular.trim().length > 30) {
    alert("El titular de la marca debe tener entre 3 y 30 caracteres.");
    return false;
  }
  if (!["Activo", "Inactivo", "Suspendido"].includes(marca.estado)) {
    alert("El estado debe ser: Activo, Inactivo o Suspendido.");
    return false;
  }
  return true;
}


 async function handleUpdate(e) {
  e.preventDefault();
  if (!validarEdicion(editMarca)) return;
  await updateMarca(editMarca.id, editMarca);
  setEditMarca(null);
  load();
}


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div className="d-flex flex-column">
          <h3 className="fw-bold text-primary">Registro de Marca</h3>
          <h4 className="text-muted">Aquí puede gestionar sus marcas</h4>
        </div>

        {!showWizard && (
          <button className="btn btn-danger" onClick={() => setShowWizard(true)}>
            + Nuevo Registro
          </button>
        )}
      </div>

     {showWizard ? (
        <WizardForm onClose={() => setShowWizard(false)} onCreated={load} />
      ) : (
        <>
          <div className="card shadow-sm">
            <div className="card-body">
              <table className="table table-hover table-striped align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Marca</th>
                    <th>Titular</th>
                    <th>Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {marcas.map((m, index) => (
                    <tr key={m.id}>
                      <td>{index + 1}</td>
                      <td>{m.nombre}</td>
                      <td>{m.titular}</td>
                      <td>{m.estado}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => setEditMarca(m)}
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >
                          Actualizar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(m.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {marcas.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No hay marcas registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* MODAL de edición */}
          <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                {editMarca && (
                  <>
                    <div className="modal-header">
                      <h5 className="modal-title">Editar Marca</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        onClick={() => setEditMarca(null)}
                      ></button>
                    </div>
                    <form onSubmit={handleUpdate}>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label className="form-label">Marca</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editMarca.nombre}
                            onChange={(e) =>
                              setEditMarca({ ...editMarca, nombre: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Titular</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editMarca.titular}
                            onChange={(e) =>
                              setEditMarca({ ...editMarca, titular: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Estado</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editMarca.estado}
                            onChange={(e) =>
                              setEditMarca({ ...editMarca, estado: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={() => setEditMarca(null)}
                        >
                          Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={
                              editMarca.nombre.trim().length < 3 ||
                              editMarca.nombre.trim().length > 30 ||
                              editMarca.titular.trim().length < 3 ||
                              editMarca.titular.trim().length > 30 ||
                              !["Activo", "Inactivo", "Suspendido"].includes(editMarca.estado)
                            }
                          >
                            Guardar
                          </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* MODAL de eliminación */}
          {showDeleteModal && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirmar eliminación</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowDeleteModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>¿Está seguro de que desea eliminar esta marca?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancelar
                    </button>
                    <button className="btn btn-danger" onClick={confirmDelete}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
