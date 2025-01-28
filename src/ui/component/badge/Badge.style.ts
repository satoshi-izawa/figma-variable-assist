import { css } from '@emotion/css';
import { createLCH, styleConst } from '../../style/styleConst';

const { color, font, margin } = styleConst;

/** @package */
export const style = {
  root: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '1rem',
    height: '1rem',
    backgroundColor: createLCH(color.fill.red),
    font: font.minimum.normal,
    padding: margin.minimum,
    borderRadius: '50%',
    color: createLCH(color.text.white),
  }),
};
