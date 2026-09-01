const KEY = "crmStaff";

const OWNER_ONLY = new Set([
  "/user",
  "/settings",
  "/pos-config",
  "/banner",
  "/policy-page",
  "/menu",
]);

export const persistStaff = (data = {}) => {
  const type = data.type === "admin" ? "owner" : data.type;
  const stores = (data.stores || []).map((store) => String(store._id || store));
  const name =
    data.name ||
    `${data.first_name || ""} ${data.last_name || ""}`.trim();
  localStorage.setItem(KEY, JSON.stringify({ type, stores, name }));
};

export const getStaff = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearStaff = () => {
  localStorage.removeItem(KEY);
};

export const isOwner = () => {
  const type = getStaff()?.type;
  return type === "owner" || type === "admin";
};

export const isManager = () => getStaff()?.type === "manager";

export const isOwnerOnlyPath = (pathname) => {
  if (pathname === "/store/create-new") return true;
  return [...OWNER_ONLY].some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
};

export const shouldLockStore = (storeList = []) =>
  isManager() && storeList.length <= 1;

export const navForRole = (items) => {
  if (isOwner()) return items;
  const hidden = new Set([
    "/pos-config",
    "/banner",
    "/policy-page",
    "/menu",
    "/user",
    "/settings",
  ]);
  return items.filter((item) => !item.to || !hidden.has(item.to));
};
