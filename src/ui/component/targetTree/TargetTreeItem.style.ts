import { css } from '@emotion/css';
import { createLCH, styleConst } from '../../style/styleConst';
import { styleMixin } from '../../style/styleMixin';

const { margin } = styleConst;
const { order } = styleMixin;

const isRootItem = css({
  borderTop: '1px solid black',
  padding: '4px',
});

/** @package */
export const style = {
  children: css({
    padding: '4px',
    marginLeft: '2em',
  }),
  isRootItem,
  scene: css({
    color: createLCH(styleConst.color.text.link),
    cursor: 'pointer',
  }),
  preview: css({
    marginLeft: '2px',
    width: '16px',
    height: '16px',
    borderRadius: '2px',
    border: '1px solid black',
  }),
  name: css({
    [`${isRootItem} &`]: {
      fontSize: '16px',
      fontWeight: '600',
    },
  }),
  type: css({
    fontSize: '10px',
    color: 'gray',
  }),
  root: css({}),
  nameRoot: css({
    ...order.horizontal({ columnGap: margin.small }),
  }),
  nameArea: css({
    ...order.horizontal({
      alignItems: 'baseline',
      columnGap: margin.small,
    }),
  }),
};
