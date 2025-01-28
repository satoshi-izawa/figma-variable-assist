import { IconComponent } from '../icon';
import { style } from './OpenButton.style';

interface Props {
  isOpen: boolean;
  onClick?: () => unknown;
}

/** @package */
export const OpenButtonComponent = ({ onClick, isOpen }: Props) => {
  return (
    <div
      className={style.root}
      onClick={onClick}>
      <IconComponent icon={isOpen ? 'angleUp' : 'angleDown'} />
    </div>
  );
};
