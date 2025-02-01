import { isDefined } from '../util/isDefined';
import {
  isStyleNode,
  isVariable,
  isVariableAlias,
} from '../util/nodeTypeGuard';

/** @package */
export const createTargetsMap = (targets: Target[]) => {
  const map: TargetMap = new Map(
    targets.map(t => [
      t.id,
      {
        target: t,
        children: [],
        parent: [],
        used: [],
        styleReference: new Map(),
      },
    ]),
  );
  targets.forEach(target => {
    if (isVariable(target)) {
      [...Object.values(target.valuesByMode)].forEach(t => {
        if (isVariableAlias(t)) {
          regist(map, target.id, t.id, 'variable');
        }
      });
    } else {
      const isScene = !isStyleNode(target);
      if (isScene) {
        styleIds.forEach(key => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          const result = (target as any)[key];
          if (!result || typeof result !== 'string' || result === '') return;
          regist(map, target.id, result, key, isScene);
        });
      }
      flatBoundVariables(target).forEach(([k, t]) => {
        regist(map, target.id, t.id, k, isScene);
      });
    }
  });
  return map;
};

const styleIds = [
  'backgroundStyleId',
  'effectStyleId',
  'fillStyleId',
  'gridStyleId',
  'strokeStyleId',
  'textStyleId',
] as const satisfies InheritedStyleField[];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type StyleIdCheck = IsTrue<
  Equal<(typeof styleIds)[number], InheritedStyleField>
>;

const flatBoundVariables = (target: Target) => {
  if (!('boundVariables' in target) || !target.boundVariables) return [];
  return isDefined(
    Object.entries(target.boundVariables)
      .map(([k, v]) => {
        if (v instanceof Array) return v.map(vv => [k, vv] as const);
        return isVariableAlias(v)
          ? [[k, v] as const]
          : Object.entries(v).map(([kk, vv]) => [`${k}/${kk}`, vv] as const);
      })
      .flat(),
  );
};

const regist = (
  map: TargetMap,
  currentId: Target['id'],
  parentId: Target['id'],
  key: string,
  isScene = false,
) => {
  const parent = map.get(parentId);
  const current = map.get(currentId);
  if (!parent || !current) {
    return;
  }
  if (isStyleNode(parent.target)) {
    current.styleReference.set(key, new Set(parent.parent.map(p => p[1])));
  }
  // 変数とスタイル両方で重複登録されるのを防ぐ
  if (isScene && isDuplicate(key, current, parentId)) return;
  current.parent.push([key, parentId]);
  parent.children.push([key, currentId]);
};

const isDuplicate = (
  key: string,
  current: TargetTreeItem,
  parentId: Target['id'],
) => {
  switch (key) {
    case 'fills':
      return !!current.styleReference.get('fillStyleId')?.has(parentId);
  }
};
