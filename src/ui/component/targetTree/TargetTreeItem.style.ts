import { css } from "@emotion/css";

const isRootItem = css({
  borderTop: '1px solid black',
  padding: '4px',
});

/** @package */
export const style = {
  children: css({
    padding: '4px',
    marginLeft: '2em',
  }),
  isRootItem,
  scene: css({
    color: 'blue',
    cursor: 'pointer',
  }),
  preview: css({
    marginLeft: '2px',
    width: '16px',
    height: '16px',
    borderRadius: '2px',
    border: '1px solid black',
  }),
  name: css({
    [`${isRootItem} &`]: {
      fontSize: '16px',
      fontWeight: '600',
    }
  }),
  type: css({
    fontSize: '10px',
    color: 'gray',
  }),
  root: css({}),
  nameRoot: css({
    display: 'flex',
    alignItems: 'center',
    '& > :nth-child(n+2)': {
      marginLeft: '4px',
    }
  }),
  nameArea: css({
    display: 'flex',
    alignItems: 'baseline',
    '& > :nth-child(n+2)': {
      marginLeft: '4px',
    }
  })
};
