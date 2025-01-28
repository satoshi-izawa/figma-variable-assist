import { css } from '@emotion/css';
import { createLCH, styleConst } from '../../style/styleConst';
import { styleMixin } from '../../style/styleMixin';

const { margin, border, font, color } = styleConst;
const { order } = styleMixin;

/** @package */
export const style = {
  usedCount: css({
    font: font.minimum.normal,
    color: createLCH(color.text.description),
  }),
  isRootItem: css({
    borderTop: border.gray,
    padding: margin.small,
  }),
  scene: css({
    color: createLCH(styleConst.color.text.link),
    cursor: 'pointer',
  }),
  name: (isRoot: boolean) =>
    css({
      font: isRoot ? font.large.bold : font.normal.normal,
    }),
  type: css({
    font: font.minimum.normal,
    color: createLCH(color.text.description),
  }),
  root: css({
    ...order.vertical({ margin: margin.minimum }),
  }),
  nameRoot: css({
    ...order.horizontal({ columnGap: margin.small }),
  }),
  children: css({
    marginLeft: margin.indent,
  }),
  nameArea: css({
    ...order.horizontal({
      alignItems: 'baseline',
      columnGap: margin.small,
    }),
  }),
};
