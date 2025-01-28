import { css } from '@emotion/css';
import { styleConst } from '../../style/styleConst';
import { styleMixin } from '../../style/styleMixin';

const { size, border, borderRadius, margin } = styleConst;
const { order } = styleMixin;

/** @package */
export const style = {
  preview: css({
    width: size.normal,
    height: size.normal,
    borderRadius: borderRadius.normal,
    border: border.gray,
  }),
  root: css({
    ...order.horizontal({ columnGap: margin.small })
  })
}
