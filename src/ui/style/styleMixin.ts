import { styleConst } from './styleConst';
import { CSSObject } from '@emotion/css/create-instance';

export const styleMixin = {
  order: {
    horizontal: ({
      display = 'flex',
      alignItems = 'center',
      rowGap = styleConst.margin.small,
      columnGap = styleConst.margin.normal,
    }: {
      display?: 'flex' | 'inline-flex';
      alignItems?: CSSObject['alignItems'];
      rowGap?: CSSObject['rowGap'];
      columnGap?: CSSObject['columnGap'];
    }) => ({
      display,
      alignItems,
      rowGap,
      columnGap,
    }),
    vertical: ({
      margin = styleConst.margin.normal,
    }: {
      margin?: CSSObject['margin'];
    }) => ({
      '&': {
        '& > :nth-child(n + 2)': {
          marginTop: margin,
        },
      } satisfies CSSObject,
    }),
  },
};
