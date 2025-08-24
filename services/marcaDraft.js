const KEY = "marcaDraft";

export function getDraft() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : { nombre: "", titular: "" };
}

export function setDraft(partial) {
  const current = getDraft() || {};
  const next = { ...current, ...partial };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearDraft() {
  localStorage.removeItem(KEY);
}
