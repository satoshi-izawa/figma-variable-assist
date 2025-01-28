export const createLCH = ({ l, c, h }: { l: number; c: number; h: number }) =>
  `lch(${l} ${c} ${h})`;

const fontFamily =
  '"Hiragino Kaku Gothic Pro", "Arial", "Biz UDPGothic", Meiryo';

const createFont = (size: string, weight: string, lineHeight: string) =>
  `${weight} ${size}/${lineHeight} ${fontFamily} `;

const fontSize = {
  // 16px
  large: '1rem',
  // 14px
  normal: '0.875rem',
  // 10px
  minimum: '0.625rem',
};
const fontWeight = {
  normal: '300',
  bold: '600',
};
const lineHeight = {
  normal: '1.5',
  label: '1',
};

const color = {
  fill: {
    body: {
      l: 100,
      c: 2,
      h: 200,
    },
    red: {
      l: 40,
      c: 100,
      h: 30,
    },
  },
  text: {
    normal: {
      l: 13,
      c: 0,
      h: 0,
    },
    link: {
      l: 30,
      c: 120,
      h: 300,
    },
    description: {
      l: 55,
      c: 0,
      h: 0,
    },
    white: {
      l: 95,
      c: 0,
      h: 0,
    },
  },
  border: {
    gray: {
      l: 70,
      c: 0,
      h: 0,
    },
    lightGray: {
      l: 85,
      c: 0,
      h: 0,
    }
  },
};

export const styleConst = {
  margin: {
    indent: '1rem',
    normal: '0.5rem',
    small: '0.25rem',
    minimum: '0.125rem',
  },
  font: {
    labelNormal: {
      normal: createFont(fontSize.normal, fontWeight.normal, lineHeight.label),
    },
    large: {
      normal: createFont(fontSize.large, fontWeight.normal, lineHeight.normal),
      bold: createFont(fontSize.large, fontWeight.bold, lineHeight.normal),
    },
    normal: {
      normal: createFont(fontSize.normal, fontWeight.normal, lineHeight.normal),
      bold: createFont(fontSize.normal, fontWeight.bold, lineHeight.normal),
    },
    minimum: {
      normal: createFont(
        fontSize.minimum,
        fontWeight.normal,
        lineHeight.normal,
      ),
    },
  },
  size: {
    normal: '1rem',
  },
  borderRadius: {
    normal: '0.125rem',
  },
  border: {
    gray: `0.0625rem solid ${createLCH(color.border.gray)}`,
    lightGray: `0.0625rem solid ${createLCH(color.border.lightGray)}`,
  },
  color,
};

/** @private */
export const rootFont = createFont(
  '16px',
  fontWeight.normal,
  lineHeight.normal,
);
