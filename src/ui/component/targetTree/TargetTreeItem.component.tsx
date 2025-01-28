import { useCallback, useState } from 'react';
import { style } from './TargetTreeItem.style';
import { postUIMessage } from '../../../util/postMessage';
import { OpenButtonComponent } from '../button';
import { TargetTreeDetailInfoComponent } from './TargetTreeDetailInfo.component';
import { TargetTreeItemChildrenComponent } from './TargetTreeItemChildren.component';
import { BadgeComponent } from '../badge';
import { PreviewComponent } from './TargetTreePreview.component';

interface Props {
  map: SerializableTargetMap;
  item: SerializableTargetTreeItem;
  usedType: string | null;
  isRoot?: boolean;
}

/** @package */
export const TargetTreeItemComponent = (props: Props) => {
  const { item, map, isRoot, usedType } = props;
  const [variables, styles] = separeteVariablesAndStyles(props);
  const [isOpen, openDispatch] = useState(false);
  const onClickOpen = useCallback(() => {
    openDispatch(!isOpen);
  }, [isOpen, openDispatch]);
  return (
    <div className={[style.root, isRoot ? style.isRootItem : ''].join(' ')}>
      {useCreateNameArea(props, isOpen, onClickOpen)}
      {isOpen ? (
        <TargetTreeDetailInfoComponent
          item={item}
          map={map}
          usedType={usedType}
        />
      ) : null}
      <div className={style.children}>
        <TargetTreeItemChildrenComponent
          array={variables}
          map={map}
          label='変数'
        />
      </div>
      <div className={style.children}>
        <TargetTreeItemChildrenComponent
          array={styles}
          map={map}
          label='スタイル'
        />
      </div>
    </div>
  );
};

const separeteVariablesAndStyles = (props: Props) => {
  const { item } = props;
  const variables = item.children.filter(c => isVariable(c, props));
  const styles = item.children.filter(c => !isVariable(c, props));
  return [variables, styles];
};

const isVariable = (c: ParentOrChild, { map }: Props) => {
  const child = map[c[1]];
  const { type } = child.target.property;
  return type === 'VARIABLE';
};

const useCreateNameArea = (
  props: Props,
  isOpen: boolean,
  onClickOpen: () => unknown,
) => {
  const { item, usedType, isRoot } = props;
  const { property, name, id } = item.target;
  const onClick = useCallback(() => {
    if (property.type !== 'SCENE') return;
    postUIMessage({
      type: 'moveToScene',
      id,
      pageId: property.pageId,
    });
  }, [property, id]);
  return (
    <div className={style.nameRoot}>
      <div
        className={style.nameArea}
        onClick={onClick}>
        <span
          className={[
            style.name(!!isRoot),
            property.type === 'SCENE' ? style.scene : '',
          ].join(' ')}>
          {name}
        </span>
        <span className={style.type}>{usedType}</span>
      </div>
      {(property.type === 'VARIABLE' || property.type === 'PAINT') &&
      property.values[0]?.type !== 'ALIAS' ? (
        <PreviewComponent
          value={property.values[0]}
          isPreviewOnly
        />
      ) : null}
      {item.used.length > 0 ? (
        <BadgeComponent count={item.used.length} />
      ) : null}
      <OpenButtonComponent
        isOpen={isOpen}
        onClick={onClickOpen}
      />
    </div>
  );
};
