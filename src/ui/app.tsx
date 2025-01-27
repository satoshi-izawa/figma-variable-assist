// eslint-disable-next-line import-access/jsdoc
import { StoreContextProvider, useStoreInit } from './hook/useStore.hook';
// eslint-disable-next-line import-access/jsdoc
import { init } from './init';
import { Main } from './main';

init();

export const App = () => {
  return (
    <StoreContextProvider value={useStoreInit()}>
      <Main />
    </StoreContextProvider>
  );
};
