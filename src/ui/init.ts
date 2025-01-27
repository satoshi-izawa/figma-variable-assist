// eslint-disable-next-line import-access/jsdoc
import { globalStyle, resetStyle } from './style/globalStyle';

/** @private */
export const init = () => {
  resetStyle();
  globalStyle();
};
