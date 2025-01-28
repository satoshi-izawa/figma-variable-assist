import { style } from './Badge.style';

interface Props {
  count: number;
}

/** @package */
export const BadgeComponent = ({ count }: Props) => {
  return <div className={style.root}>{count}</div>;
};
