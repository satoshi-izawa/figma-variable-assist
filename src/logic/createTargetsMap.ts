import { isDefined } from '../util/isDefined';
import { isStyle, isVariable } from '../util/nodeTypeGuard';

/** @package */
export const createTargetsMap = (targets: Target[]) => {
  const map: TargetMap = new Map(
    targets.map(t => [t.id, { target: t, children: [], parent: [] }]),
  );
  targets.forEach(target => {
    if (isVariable(target)) {
      [...Object.values(target.valuesByMode)].forEach(t => {
        if (isAlias(t)) {
          regist(map, target.id, t.id);
        }
      });
    } else {
      flatBoundVariables(target).forEach(t => {
        regist(map, target.id, t.id);
      });
      if (isStyle(target)) return;
      styleIds.forEach(key => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const result = (target as any)[key];
        if (!result || typeof result !== 'string' || result === '') return;
        regist(map, target.id, result);
      })
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
type StyleIdCheck = IsTrue<Equal<typeof styleIds[number], InheritedStyleField>>;


const flatBoundVariables = (target: Target) => {
  if (!('boundVariables' in target) || !target.boundVariables) return [];
  return isDefined(Object.entries(target.boundVariables).map(([_, v]) => {
    if (v instanceof Array) return v;
    return isAlias(v) ? v : Object.entries(v).map(([_, vv]) => vv)
  }).flat());
}

const regist = (
  map: TargetMap,
  currentId: Target['id'],
  parentId: Target['id'],
) => {
  const parent = map.get(parentId);
  const current = map.get(currentId);
  if (!parent || !current) {
    return;
  }
  current.parent.push(parentId);
  parent.children.push(currentId);
};

const isAlias = (variable: VariableValue | Record<string, VariableAlias>): variable is VariableAlias => typeof variable === 'object' && 'id' in variable;
