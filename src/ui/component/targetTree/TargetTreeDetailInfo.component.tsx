import { JSX, useMemo } from 'react';
import { style } from './TargetTreeDetailInfo.style';
import { TargetTreeItemChildrenComponent } from './TargetTreeItemChildren.component';
import { PreviewComponent } from './TargetTreePreview.component';
import { isSceneItem } from '../../../util/nodeTypeGuard';

interface Props {
  map: SerializableTargetMap;
  item: SerializableTargetTreeItem;
  usedType: string | null;
}

/** @package */
export const TargetTreeDetailInfoComponent = (props: Props) => {
  const { item } = props;
  return (
    <div className={style.root}>
      {createRow('type', '種別', item.target.property.type)}
      {createTypePropetyArea(props)}
      {useCreateUsedArea(props)}
    </div>
  );
};

const createRow = (
  key: string,
  label: string,
  value: string | JSX.Element | null,
) =>
  value !== null ? (
    <div
      className={style.row}
      key={key}>
      <span className={style.label}>{label}</span>
      <span>{value}</span>
    </div>
  ) : null;

const createTypePropetyArea = ({ item }: Props) => {
  const { property } = item.target;
  switch (property.type) {
    case 'VARIABLE': {
      return (
        <div>
          {property.values.map((v, i) =>
            createRow(`${i}`, `値${i + 1}`, toDisplayElement(v)),
          )}
        </div>
      );
    }
    case 'PAINT': {
      return (
        <div>
          {property.values.map((v, i) =>
            createRow(`${i}`, `値${i + 1}`, toDisplayElement(v)),
          )}
        </div>
      );
    }
  }
  return null;
};

const toDisplayElement = (v: SerializableValue) => {
  switch (v?.type) {
    case 'ALIAS':
      return (
        <div className={style.alias}>
          <span>参照: {v.name}</span>（{toDisplayElement(v.reference)}）
        </div>
      );
    case 'COLOR':
      return <PreviewComponent value={v} />;
    case 'BOOLEAN':
      return <div>{v.value}</div>;
    case 'NUMBER':
      return <div>{v.value}</div>;
    case 'STRING':
      return <div>{v.value}</div>;
  }
  return null;
};

const useCreateUsedArea = ({ item, map }: Props) => {
  const used = useMemo(
    () => item.children.filter(c => isSceneItem(map[c[1]])),
    [item, map],
  );
  return (
    <TargetTreeItemChildrenComponent
      array={used}
      label='利用箇所'
      map={map}
    />
  );
};
