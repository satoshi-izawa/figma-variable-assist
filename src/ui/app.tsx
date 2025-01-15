import { StoreContextProvider, useStoreInit } from "./hook/useStore.hook";
import { Main } from "./main";

export const App = () => {
  return <StoreContextProvider value={useStoreInit()}>
    <Main />
  </StoreContextProvider >
};
