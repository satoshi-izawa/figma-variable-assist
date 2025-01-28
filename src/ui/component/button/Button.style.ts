import { css } from '@emotion/css';
import { styleConst } from '../../style/styleConst';

const { border, borderRadius, margin, font } = styleConst;

/** @package */
export const style = {
  root: css({
    padding: `${margin.small} ${margin.normal}`,
    border: border.gray,
    borderRadius: borderRadius.normal,
    font: font.labelNormal.normal,
    cursor: 'pointer',
  }),
};
