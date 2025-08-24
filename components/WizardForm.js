import { useState } from "react";
import { getDraft, setDraft, clearDraft } from "../services/marcaDraft";
import { createMarca } from "../services/marcaService";

// FORMULARIO DE PASOS EN CREACION DE MARCAS
function WizardSteps({ step }) {
  return (
    <div className="d-flex justify-content-center my-3">
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          className={`mx-2 rounded-circle border d-flex align-items-center justify-content-center`}
          style={{
            width: "35px",
            height: "35px",
            backgroundColor: step === num ? "#f8d7da" : "#e9ecef",
            color: step === num ? "#dc3545" : "#6c757d",
            fontWeight: "bold",
          }}
        >
          {num}
        </div>
      ))}
    </div>
  );
}

export default function WizardForm({ onClose, onCreated }) {
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState(getDraft()?.nombre || "");
  const [titular, setTitular] = useState(getDraft()?.titular || "");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);

  function validarStep1() {
    if (nombre.trim().length < 3 || nombre.trim().length > 30) {
      setError("El nombre de la marca debe tener entre 3 y 30 caracteres.");
      return false;
    }
    setError("");
    return true;
  }

  function validarStep2() {
    if (titular.trim().length < 3 || titular.trim().length > 30) {
      setError("El titular debe tener entre 3 y 30 caracteres.");
      return false;
    }
    setError("");
    return true;
  }

  function continuar() {
    if (step === 1 && validarStep1()) {
      setDraft({ nombre });
      setStep(2);
    } else if (step === 2 && validarStep2()) {
      setDraft({ titular });
      setStep(3);
    }
  }

  function atras() {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  }

  async function crear() {
    try {
      setLoading(true);
      if (!validarStep1() || !validarStep2()) return;
      await createMarca({ nombre, titular });
      clearDraft();
      onCreated();
      onClose();
    } catch (e) {
      alert("Error al crear la marca: " + (e.response?.data?.detail || e.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card shadow-sm p-4">
      <h3 className="fw-bold text-primary">Crear Nueva Marca</h3>
      <WizardSteps step={step} />

      {/* Mensaje de error */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {step === 1 && (
        <>
          <label className="form-label mt-3">Marca a Registrar</label>
          <input 
          className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="marca..."
          />
          <div className="mt-3 d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={continuar} disabled={!nombre.trim()}>Continuar →</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <label className="form-label mt-3">Titular de la Marca</label>
          <input
            className="form-control"
            value={titular}
            onChange={(e) => setTitular(e.target.value)}
            placeholder="titular..."
          />
          <div className="mt-3 d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={atras}>← Atrás</button>
            <button className="btn btn-primary" onClick={continuar} disabled={!titular.trim()}>Continuar → </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="mt-3">
            <p><b>Marca a Registrar:</b> {nombre || "-"}</p>
            <p><b>Titular de la marca:</b> {titular || "-"}</p>
          </div>
          <div className="mt-3 d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={atras}>
              ← Atrás
            </button>
            <button className="btn btn-success" onClick={crear} disabled={loading}>
              {loading ? "Creando..." : "Crear"}
             </button>
          </div>
        </>
      )}
    </div>
  );
}
