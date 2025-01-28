import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { style } from './Icon.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const icons = {
  angleDown: faAngleDown,
  angleUp: faAngleUp,
} as const;

library.add(...Object.values(icons));

interface Props {
  icon: keyof typeof icons;
}

/** @package */
export const IconComponent = ({ icon }: Props) => {
  return (
    <div className={style.root}>
      <FontAwesomeIcon icon={icons[icon]} />
    </div>
  );
};
