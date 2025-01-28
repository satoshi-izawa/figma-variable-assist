import { useCallback, useEffect } from 'react';
import { postUIMessage } from '../../../util/postMessage';
import { ButtonComponent } from '../button';

/** @package */
export const RefreshButtonComponent = () => {
  const onClick = useCallback(() => {
    postUIMessage({ type: 'refresh' });
  }, []);
  useEffect(() => {
    onClick();
  }, [onClick]);
  return (
    <ButtonComponent
      onClick={onClick}
      label='再読み込み'
    />
  );
};
