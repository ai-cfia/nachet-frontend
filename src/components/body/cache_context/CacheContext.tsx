import { createContext, useReducer, useContext, ReactNode } from "react";

type Action = { type: "increment" } | { type: "decrement" };
type Dispatch = (action: Action) => void;
type State = { count: number };
type CacheProviderProps = { children: ReactNode };

const CacheContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const cacheReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CACHE":
      return { ...state, [action.payload.key]: action.payload.value };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const CacheProvider = ({ children }) => {
  const [cache, dispatch] = useReducer(cacheReducer, {});

  return (
    <CacheContext.Provider value={{ cache, dispatch }}>
      {children}
    </CacheContext.Provider>
  );
};

const useCache = () => {
  const context = useContext(CacheContext);

  if (context === undefined) {
    throw new Error("useCache must be used within a CacheProvider");
  }

  return context;
};

export { CacheProvider, useCache };
