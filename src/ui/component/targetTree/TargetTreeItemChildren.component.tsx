import { TargetTreeItemComponent } from './TargetTreeItem.component';
import { style } from './TargetTreeItemChildren.style';

interface Props {
  map: SerializableTargetMap;
  array: ParentOrChild[];
  label: string;
}

/** @package */
export const TargetTreeItemChildrenComponent = ({
  map,
  array,
  label,
}: Props) => {
  return array.length > 0 ? (
    <div className={style.root}>
      <span className={style.label}>{label}</span>
      <div>
        {array.map(c => {
          const child = map[c[1]];
          return (
            <TargetTreeItemComponent
              item={child}
              usedType={c[0]}
              map={map}
              key={c[1]}
            />
          );
        })}
      </div>
    </div>
  ) : null;
};
