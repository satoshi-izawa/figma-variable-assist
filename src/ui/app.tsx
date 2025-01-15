import { useEffect, useRef } from "react";
import { assertDefined } from "../util/assertDefined";

export const App = () => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    assertDefined(ref.current);
    ref.current.addEventListener('click', () => {
      console.log('click');
      parent.postMessage({ pluginMessage: { type: 'test' } }, '*');
    });
  }, []);
  return <button ref={ref}>test</button>;
};
