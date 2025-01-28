import { style } from './Button.style';

interface Props {
  onClick: () => unknown;
  label: string;
}

/** @package */
export const ButtonComponent = ({ onClick, label }: Props) => {
  return (
    <button
      className={style.root}
      onClick={onClick}>
      {label}
    </button>
  );
};
