import { useEffect } from 'react';
import { useStore } from './hook/useStore.hook';
import { RefreshButtonComponent, TargetTreeComponent } from './component';

export const Main = () => {
  const { dispatch } = useStore().targetTree;
  useEffect(() => {
    const messageHandler = (
      event: MessageEvent<{ pluginMessage: LogicMessage }>,
    ) => {
      const message = event.data.pluginMessage;
      switch (message.type) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        case 'createTargetMap': {
          dispatch({ type: 'update', map: message.map });
        }
      }
    };
    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [dispatch]);
  return (
    <div>
      <RefreshButtonComponent />
      <TargetTreeComponent />
    </div>
  );
};
