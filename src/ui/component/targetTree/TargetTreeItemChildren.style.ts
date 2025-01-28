import { css } from '@emotion/css';
import { createLCH, styleConst } from '../../style/styleConst';

const { margin, color, font } = styleConst;

/** @package */
export const style = {
  root: css({
    padding: margin.minimum,
  }),
  label: css({
    color: createLCH(color.text.description),
    font: font.minimum.normal,
  }),
};
