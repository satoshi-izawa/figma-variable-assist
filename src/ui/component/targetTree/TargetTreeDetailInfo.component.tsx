import { JSX } from 'react';
import { style } from './TargetTreeDetailInfo.style';
import { TargetTreeItemChildrenComponent } from './TargetTreeItemChildren.component';
import { PreviewComponent } from './TargetTreePreview.component';

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
      {createUsedArea(props)}
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
      return toDisplayElement(v.reference);
    case 'COLOR':
      return <PreviewComponent value={v} />;
    case 'BOOLEAN':
      return `${v.value}`;
    case 'NUMBER':
      return `${v.value}`;
    case 'STRING':
      return v.value;
  }
  return null;
};

const createUsedArea = ({ item, map }: Props) => (
  <TargetTreeItemChildrenComponent
    array={item.used}
    label='利用箇所'
    map={map}
  />
);
