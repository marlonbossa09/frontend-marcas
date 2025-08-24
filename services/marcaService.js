// SERVICIOS DE MARCAS
const API = process.env.NEXT_PUBLIC_API_URL;
const AUTH = () => "Bearer " + localStorage.getItem("access_token");

export async function getAllMarcas() {
  const res = await fetch(`${API}/servicios/marcas/`, {
    headers: { "Authorization": AUTH() }
  });
  if (!res.ok) throw new Error("Error al cargar marcas");
  return res.json();
}

export async function getMarcaById(id) {
  const res = await fetch(`${API}/servicios/marcas/${id}`, {
    headers: { "Authorization": AUTH() }
  });
  if (!res.ok) throw new Error("Error al cargar la marca");
  return res.json();
}

export async function createMarca(data) {
  const res = await fetch(`${API}/servicios/marcas/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": AUTH(),
    },
    body: JSON.stringify({
      nombre: data.nombre,
      titular: data.titular,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Error al crear la marca: " + errorText);
  }

  return res.json();
}

export async function updateMarca(id, data) {
  const res = await fetch(`${API}/servicios/marcas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": AUTH()
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al actualizar la marca");
  return res.json();
}

export async function deleteMarca(id) {
  const res = await fetch(`${API}/servicios/marcas/${id}`, {
    method: "DELETE",
    headers: { "Authorization": AUTH() }
  });
  if (!res.ok) throw new Error("Error al eliminar la marca");
  return true;
}
