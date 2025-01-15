import { createContext, useContext } from "react";
import { useTargetTreeReducer } from "../reducer/targetTree.reducer";

interface Store {
  targetTree: ReturnType<typeof useTargetTreeReducer>;
}

const StoreContext = createContext({} as Store);
/** @private */
export const StoreContextProvider = StoreContext.Provider;

/** @private */
export const useStoreInit = () => {
  const targetTree = useTargetTreeReducer();
  return { targetTree };
};

export const useStore = () => useContext(StoreContext);
