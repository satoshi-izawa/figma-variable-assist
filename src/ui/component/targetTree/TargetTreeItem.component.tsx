import { useCallback } from "react";
import { style } from "./TargetTreeItem.style";
import { postUIMessage } from "../../../util/postMessage";

interface Props {
  map: SerializableTargetMap;
  item: SerializableTargetTreeItem;
}

/** @package */
export const TargetTreeItemComponent = (props: Props) => {
  const { item, map } = props;
  return (
    <div>
      {createNameArea(props)}
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

const createNameArea = ({ item }: Props) => {
  const { property, name, id } = item.target;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onClick = useCallback(() => {
    if (property.type !== 'SCENE') return;
    postUIMessage({ type: 'moveToScene', id, pageId: property.pageId });
  }, [property, id]);
  return property.type === 'SCENE' ? <div className={style.sceneItem} onClick={onClick} >{name}</div> : <div>{name}</div>;
}
