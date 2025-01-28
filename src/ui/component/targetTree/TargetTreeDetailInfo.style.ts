import { css } from '@emotion/css';
import { styleConst } from '../../style/styleConst';
import { styleMixin } from '../../style/styleMixin';

const { border, borderRadius, margin } = styleConst;
const { order } = styleMixin;

/** @package */
export const style = {
  root: css({
    padding: margin.small,
    borderRadius: borderRadius.normal,
    border: border.lightGray,
  }),
  row: css({
    ...order.horizontal({}),
  }),
  label: css({
    width: '6rem',
  }),
  value: css({
    flexGrow: 1,
  }),
};
