const useBackendUrl = (): string => {
  const backendURL = process.env.VITE_BACKEND_URL ?? "";
  if (backendURL === null || backendURL === undefined || backendURL === "") {
    console.error("VITE_BACKEND_URL environment variable is not set.");
  }
  return backendURL;
};

export default useBackendUrl;
