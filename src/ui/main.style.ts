import { css } from '@emotion/css';
import { styleMixin } from './style/styleMixin';

/** @package */
export const style = {
  root: css({
    ...styleMixin.order.vertical({}),
  }),
};
