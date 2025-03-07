import { css } from '@emotion/css';
import { styleMixin } from './style/styleMixin';
import { styleConst } from './style/styleConst';

const { margin } = styleConst;
const { order } = styleMixin;

/** @package */
export const style = {
  root: css({
    padding: margin.small,
    ...order.vertical({}),
  }),
};
