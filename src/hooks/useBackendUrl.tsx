const useBackendUrl = (): string => {
  const backendURL = process.env.VITE_BACKEND_URL;
  if (backendURL === null || backendURL === undefined || backendURL === "") {
    throw new Error("VITE_BACKEND_URL environment variable is not set.");
  }
  return backendURL;
};

export default useBackendUrl;
