import { useCallback, useMemo, useState } from 'react';
import { style } from './TargetTreeItem.style';
import { postUIMessage } from '../../../util/postMessage';
import { OpenButtonComponent } from '../button';
import { TargetTreeDetailInfoComponent } from './TargetTreeDetailInfo.component';
import { TargetTreeItemChildrenComponent } from './TargetTreeItemChildren.component';
import { BadgeComponent } from '../badge';
import { PreviewComponent } from './TargetTreePreview.component';
import {
  isSceneItem,
  isStyleItem,
  isVariableItem,
} from '../../../util/nodeTypeGuard';

interface Props {
  map: SerializableTargetMap;
  item: SerializableTargetTreeItem;
  usedType: string | null;
  isRoot?: boolean;
}

/** @package */
export const TargetTreeItemComponent = (props: Props) => {
  const { item, map, isRoot, usedType } = props;
  const [variables, styles, scenes] = useSepareteTargets(props);
  const [isOpen, openDispatch] = useState(false);
  const onClickOpen = useCallback(() => {
    openDispatch(!isOpen);
  }, [isOpen, openDispatch]);
  return (
    <div className={[style.root, isRoot ? style.isRootItem : ''].join(' ')}>
      {useCreateNameArea(props, isOpen, onClickOpen, scenes)}
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

const useSepareteTargets = ({ item, map }: Props) => {
  return useMemo(() => {
    const variables = item.children.filter(c => isVariableItem(map[c[1]]));
    const styles = item.children.filter(c => isStyleItem(map[c[1]]));
    const scenes = item.children.filter(c => isSceneItem(map[c[1]]));
    return [variables, styles, scenes];
  }, [item, map]);
};

const useCreateNameArea = (
  props: Props,
  isOpen: boolean,
  onClickOpen: () => unknown,
  scenes: ParentOrChild[],
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
      {scenes.length > 0 ? <BadgeComponent count={scenes.length} /> : null}
      <OpenButtonComponent
        isOpen={isOpen}
        onClick={onClickOpen}
      />
    </div>
  );
};
