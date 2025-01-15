import { assertDefined } from '../util/assertDefined';
import { isDefined } from '../util/isDefined';

type Target = Variable | EffectStyle | GridStyle | PaintStyle | TextStyle;
type TargetMap = Map<
  Target['id'],
  { target: Target; children: Target['id'][]; parent: Target['id'][] }
>;

export const createTargetsMap = (targets: Target[]) => {
  const map: TargetMap = new Map(
    targets.map(t => [t.id, { target: t, children: [], parent: [] }]),
  );
  targets.forEach(target => {
    const current = map.get(target.id);
    assertDefined(current);
    if (isVariable(target)) {
      [...Object.values(target.valuesByMode)].forEach(t => {
        if (isAlias(t)) {
          register(map, target.id, t.id);
        }
      });
    } else if (isEffectStyle(target)) {
      isDefined([target.boundVariables?.effects].flat()).forEach(t => {
        register(map, target.id, t.id);
      });
    } else if (isGridStyle(target)) {
      isDefined([target.boundVariables?.layoutGrids].flat()).forEach(t => {
        register(map, target.id, t.id);
      });
    } else if (isPaintStyle(target)) {
      isDefined([target.boundVariables?.paints].flat()).forEach(t => {
        register(map, target.id, t.id);
      });
    } else if (isTextStyle(target)) {
      isDefined(
        [
          target.boundVariables?.fontFamily,
          target.boundVariables?.fontSize,
          target.boundVariables?.fontStyle,
          target.boundVariables?.fontWeight,
          target.boundVariables?.letterSpacing,
          target.boundVariables?.lineHeight,
          target.boundVariables?.paragraphIndent,
          target.boundVariables?.paragraphSpacing,
        ].flat(),
      ).forEach(t => {
        register(map, target.id, t.id);
      });
    }
  });
  console.log([...map.entries()]);
  return map;
};

const register = (
  map: TargetMap,
  currentId: Target['id'],
  parentId: Target['id'],
) => {
  const parent = map.get(parentId);
  assertDefined(parent);
  const current = map.get(currentId);
  assertDefined(current);
  current.parent.push(parentId);
  parent.children.push(currentId);
};

const isAlias = (variable: VariableValue) =>
  typeof variable === 'object' && 'id' in variable;
const isVariable: (target: Target) => target is Variable = target =>
  'valuesByMode' in target;
const isEffectStyle = (target: Target) =>
  'type' in target && target.type === 'EFFECT';
const isGridStyle = (target: Target) =>
  'type' in target && target.type === 'GRID';
const isPaintStyle = (target: Target) =>
  'type' in target && target.type === 'PAINT';
const isTextStyle = (target: Target) =>
  'type' in target && target.type === 'TEXT';
