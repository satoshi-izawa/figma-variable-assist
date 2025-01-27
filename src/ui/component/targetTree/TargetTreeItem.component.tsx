import { useCallback } from 'react';
import { style } from './TargetTreeItem.style';
import { postUIMessage } from '../../../util/postMessage';

interface Props {
  map: SerializableTargetMap;
  item: SerializableTargetTreeItem;
  isRoot?: boolean;
}

/** @package */
export const TargetTreeItemComponent = (props: Props) => {
  const { item, map, isRoot } = props;
  return (
    <div className={[style.root, isRoot ? style.isRootItem : ''].join(' ')}>
      {useCreateNameArea(props)}
      {item.children.length > 0 ? (
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
      ) : null}
    </div>
  );
};

const useCreateNameArea = (props: Props) => {
  const { property, name, id } = props.item.target;
  const onClick = useCallback(() => {
    if (property.type !== 'SCENE') return;
    postUIMessage({
      type: 'moveToScene',
      id,
      pageId: property.pageId,
    });
  }, [property, id]);
  return (
    <div
      className={style.nameRoot}
      onClick={onClick}>
      <div className={style.nameArea}>
        <span
          className={[
            style.name,
            property.type === 'SCENE' ? style.scene : '',
          ].join(' ')}>
          {name}
        </span>
        <span className={style.type}>{property.type}</span>
      </div>
      {createPreviews(props)}
    </div>
  );
};

const createPreviews = (props: Props) => {
  const { property } = props.item.target;
  if (property.type !== 'COLOR_VARIABLE') return null;
  return property.values.map((v, i) => {
    return isColor(v) ? (
      <div
        key={i}
        className={style.preview}
        style={{ backgroundColor: createColorStyle(v) }}></div>
    ) : null;
  });
};

const isColor = (value: VariableValue) =>
  typeof value === 'object' && 'r' in value;

const createColorStyle = (value: RGB | RGBA) => {
  return `rgb(${toPercent(value.r)}% ${toPercent(value.g)}% ${toPercent(value.b)}% / ${'a' in value ? value.a : '1'})`;
};
const toPercent = (num: number) => (num * 100).toPrecision(2);
