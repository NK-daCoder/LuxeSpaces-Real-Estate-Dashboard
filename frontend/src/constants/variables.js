const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
  throw new Error("VITE_BACKEND_URL is not defined in your .env file!");
}

export { backendUrl }
