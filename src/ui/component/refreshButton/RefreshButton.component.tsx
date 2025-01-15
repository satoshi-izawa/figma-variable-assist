import { useEffect, useRef } from 'react';
import { assertDefined } from '../../../util/assertDefined';
import { postUIMessage } from '../../../util/postMessage';

/** @package */
export const RefreshButtonComponent = () => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    assertDefined(ref.current);
    postUIMessage({ type: 'refresh' });
    ref.current.addEventListener('click', () => {
      postUIMessage({ type: 'refresh' });
    });
  }, []);
  return <button ref={ref}>再読み込み</button>;
};
