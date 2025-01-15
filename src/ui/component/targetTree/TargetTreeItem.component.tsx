import { style } from "./TargetTreeItem.style";

interface Props {
  map: SerializableTargetMap;
  item: SerializableTargetItem;
}

/** @package */
export const TargetTreeItemComponent = (props: Props) => {
  const { item, map } = props;
  return (
    <div>
      <div>{item.target.name}</div>
      <div className={style.children}>
        {item.children.map(c => {
          const child = map[c];
          return (
            <TargetTreeItemComponent
              item={child}
              map={map}
              key={c}
            />
          );
        })}
      </div>
    </div>
  );
};
