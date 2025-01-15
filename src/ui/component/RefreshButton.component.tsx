import { useEffect, useRef } from "react";
import { assertDefined } from "../../util/assertDefined";
import { postUIMessage } from "../../util/postMessage";

export const RefreshButtonComponent = () => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    assertDefined(ref.current);
    ref.current.addEventListener('click', () => {
      postUIMessage({ type: 'refresh' });
    });
  }, []);
  return <button ref={ref}>再読み込み</button>;
}
