const fontSize = {
  // 14px
  normal: '0.875rem',
}
const fontWeight = {
  normal: '300',
  bold: '600',
}
const lineHeight = {
  normal: '1.5',
}

export const styleConst = {
  margin: {
    indent: '1rem',
    normal: '0.5rem',
    small: '0.25rem',
    minimum: '0.125rem',
  },
  fontFamily: '"Hiragino Kaku Gothic Pro", "Arial", "Biz UDPGothic", Meiryo',
  font: {
    normal: {
      normal: `${fontSize.normal} ${fontWeight.normal} ${lineHeight.normal}`,
      bold: `${fontSize.normal} ${fontWeight.bold} ${lineHeight.normal}`,
    },
  },
  color: {
    text: {
      normal: {
        l: 10,
        c: 0,
        h: 140,
      },
      link: {
        l: 30,
        c: 120,
        h: 300,
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
export const createLCH = ({ l, c, h }: { l: number, c: number, h: number }) => `lch(${l} ${c} ${h})`;
