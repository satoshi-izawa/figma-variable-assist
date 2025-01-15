// eslint-disable-next-line import-access/jsdoc
import { StoreContextProvider, useStoreInit } from './hook/useStore.hook';
import { Main } from './main';

export const App = () => {
  return (
    <StoreContextProvider value={useStoreInit()}>
      <Main />
    </StoreContextProvider>
  );
};
