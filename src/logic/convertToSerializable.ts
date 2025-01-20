import { assertDefined } from "../util/assertDefined";
import { isPageNode, isStyle, isVariable } from "../util/nodeTypeGuard";

/** @package */
export const convertToSerializable = (map: TargetMap): SerializableTargetMap => {
  return Object.fromEntries([...map.entries()].map(([id, item]) => {
    const { target } = item;
    return [id, ({
      children: item.children,
      parent: item.parent,
      target: {
        id,
        name: target.name,
        property: createTypeAndProperty(target),
      } as SerializableTargets
    } satisfies SerializableTargetTreeItem)]
  }));
}

const createTypeAndProperty = (target: Target): SerializableTargets['property'] => {
  if (isVariable(target)) {
    if (target.resolvedType === 'COLOR') {
      return {
        type: 'COLOR_VARIABLE',
        values: Object.values(target.valuesByMode),
      };
    }
    return {
      type: 'VARIABLE',
      values: Object.values(target.valuesByMode)
    };
  } else if (isStyle(target)) {
    switch (target.type) {
      case 'EFFECT': return { type: 'EFFECT' };
      case 'GRID': return { type: 'GRID' };
      case 'PAINT': return { type: 'PAINT' };
      case 'TEXT': return { type: 'TEXT' };
    }
  }
  return { type: 'SCENE', pageId: findPageId(target) };
}

const findPageId = (target: SceneNode) => {
  let current: BaseNode | null = target;
  while (current && !isPageNode(current)) {
    current = current.parent ? current.parent : null;
  }
  assertDefined(current);
  return current.id;
}
