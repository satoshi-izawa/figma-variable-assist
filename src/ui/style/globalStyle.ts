import { injectGlobal } from "@emotion/css";
import { createLCH, styleConst } from "./styleConst";

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
    '::placeholder': {
    },
    a: {
      '&:hover': {
        textDecoration: 'underline',
      },

      color: createLCH(styleConst.color.text.link),
      cursor: 'pointer',
    },
    body: {
      fontFamily: styleConst.fontFamily,
      font: styleConst.font.normal.normal,
      color: createLCH(styleConst.color.text.normal),
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
