// SERVICIOS DE USUARIO
const API = process.env.NEXT_PUBLIC_API_URL;
export async function getProfile() {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API}/auth/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  });

  if (!res.ok) throw new Error("No autorizado");
  return res.json();
}

export async function updateProfile(data) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API}/auth/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar perfil");
  return res.json();
}
