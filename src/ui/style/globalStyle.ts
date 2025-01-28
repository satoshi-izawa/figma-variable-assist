import { injectGlobal } from '@emotion/css';
// eslint-disable-next-line import-access/jsdoc
import { createLCH, rootFont, styleConst } from './styleConst';

const { color, font } = styleConst;

/** @private */
export function resetStyle() {
  injectGlobal({
    '*:where(:not(iframe, canvas, img, svg, video):not(svg *))': {
      all: 'unset',
      display: 'revert',
    },
  });
  injectGlobal({
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    img: {
      maxBlockSize: '100%',
      maxInlineSize: '100%',
    },
    'ol, ul': {
      listStyle: 'none',
    },
    table: {
      borderCollapse: 'collapse',
    },
  });
}

/** @private */
export function globalStyle() {
  injectGlobal({
    '::placeholder': {},
    a: {
      '&:hover': {
        textDecoration: 'underline',
      },
      color: createLCH(color.text.link),
      cursor: 'pointer',
    },
    html: {
      font: rootFont,
    },
    body: {
      backgroundColor: createLCH(color.fill.body),
      font: font.normal.normal,
      color: createLCH(color.text.normal),
      overflowWrap: 'anywhere',
      padding: '0',
    },
    'html, body': {
      height: '100%',
      width: '100%',
    },
    'input, textarea, button': {
      fontFamily: 'inherit',
    },
    textarea: {
      resize: 'vertical',
    },
  });
}
