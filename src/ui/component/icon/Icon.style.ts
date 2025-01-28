import { css } from '@emotion/css';
import { styleConst } from '../../style/styleConst';

const { size } = styleConst;

/** @package */
export const style = {
  root: css({
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    verticalAlign: 'text-top',
    width: size.normal,
  }),
};
