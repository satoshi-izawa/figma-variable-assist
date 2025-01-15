import { useEffect } from "react";
import { useStore } from "./hook/useStore.hook";
import { RefreshButtonComponent } from "./component/RefreshButton.component";
import { TargetTreeComponent } from "./component/targetTree/TargetTree.component";

export const Main = () => {
  const { dispatch } = useStore().targetTree;
  useEffect(() => {
    const messageHandler = (event: MessageEvent<{ pluginMessage: LogicMessage }>) => {
      console.log(event);
      const message = event.data.pluginMessage;
      switch (message.type) {
        case 'createTargetMap': {
          dispatch({ type: 'update', map: message.map });
        };
      }
    }
    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [dispatch]);
  return <div>
    <RefreshButtonComponent />
    <TargetTreeComponent />
  </div>;
}
