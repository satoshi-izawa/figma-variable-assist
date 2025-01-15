import { useStore } from '../../hook/useStore.hook';
import { TargetTreeItemComponent } from './TargetTreeItem.component';

/** @package */
export const TargetTreeComponent = () => {
  const { state } = useStore().targetTree;
  const { map, rootItems } = state;
  return (
    <div>
      {rootItems.map(r => (
        <>
          <TargetTreeItemComponent
            key={r.target.id}
            item={r}
            map={map}
          />
          <hr />
        </>
      ))}
    </div>
  );
};
