const getTokenFromStorage = (): string | null => {
  try {
    const raw = localStorage.getItem("persist:auth");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed.token ? JSON.parse(parsed.token) : null;
  } catch {
    return null;
  }
};
export default getTokenFromStorage;