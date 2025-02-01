import { assertDefined } from '../util/assertDefined';
import { isDefined } from '../util/isDefined';
import {
  isPageNode,
  isStyleNode,
  isVariable,
  isVariableAlias,
} from '../util/nodeTypeGuard';

/** @package */
export const convertToSerializable = (
  map: TargetMap,
): SerializableTargetMap => {
  return Object.fromEntries(
    [...map.entries()].map(([id, item]) => {
      const { target } = item;
      return [
        id,
        {
          children: item.children,
          parent: item.parent,
          target: {
            id,
            name: target.name,
            property: createTypeAndProperty(map, target),
          } as SerializableTargets,
        } satisfies SerializableTargetTreeItem,
      ];
    }),
  );
};

const createTypeAndProperty = (
  map: TargetMap,
  target: Target,
): SerializableTargets['property'] => {
  if (isVariable(target)) {
    return {
      type: 'VARIABLE',
      values: Object.values(target.valuesByMode).map(v =>
        convertToSerializableValue(map, target, v),
      ),
    };
  } else if (isStyleNode(target)) {
    switch (target.type) {
      case 'EFFECT':
        return { type: 'EFFECT' };
      case 'GRID':
        return { type: 'GRID' };
      case 'PAINT':
        return {
          type: 'PAINT',
          values: (target.boundVariables?.paints
            ? target.boundVariables.paints
            : isDefined(target.paints.map(p => ('color' in p ? p.color : null)))
          ).map(v => convertToSerializableValue(map, target, v)),
        };
      case 'TEXT':
        return { type: 'TEXT' };
    }
  }
  return {
    type: 'SCENE',
    pageId: findPageId(target),
  };
};

const convertToSerializableValue = (
  map: TargetMap,
  target: Target,
  value: VariableValue,
): SerializableValue => {
  if (isVariable(target)) {
    if (isVariableAlias(value)) return createAliasValue(map, value);
    switch (target.resolvedType) {
      case 'COLOR':
        return isColor(value)
          ? {
              type: 'COLOR',
              hex: rgbToHex(value),
            }
          : null;
      case 'BOOLEAN':
        return typeof value === 'boolean'
          ? {
              type: 'BOOLEAN',
              value,
            }
          : null;
      case 'FLOAT':
        return typeof value === 'number'
          ? {
              type: 'NUMBER',
              value,
            }
          : null;
      case 'STRING':
        return typeof value === 'string'
          ? {
              type: 'STRING',
              value,
            }
          : null;
    }
  }
  if (isStyleNode(target)) {
    switch (target.type) {
      case 'PAINT': {
        return isColor(value)
          ? {
              type: 'COLOR',
              hex: rgbToHex(value),
            }
          : isVariableAlias(value)
            ? createAliasValue(map, value)
            : null;
      }
    }
  }
  return null;
};

const createAliasValue = (
  map: TargetMap,
  value: VariableAlias,
): SerializableValue => {
  let parent = map.get(value.id);
  assertDefined(parent);
  while (parent.parent.length !== 0) {
    parent = map.get(parent.parent[0][1]);
    assertDefined(parent);
  }
  return {
    type: 'ALIAS',
    name: parent.target.name,
    reference: isVariable(parent.target)
      ? convertToSerializableValue(
          map,
          parent.target,
          [...Object.values(parent.target.valuesByMode)][0],
        )
      : null,
  };
};

const isColor = (value: VariableValue) =>
  typeof value === 'object' && 'r' in value && 'g' in value && 'b' in value;

const rgbToHex = (value: RGB | RGBA) => {
  return `#${toHex(value.r)}${toHex(value.g)}${toHex(value.b)}${'a' in value && value.a !== 1 ? toHex(value.a) : ''}`;
};
const toHex = (value: number) =>
  Math.round(value * 255)
    .toString(16)
    .padStart(2, '0');

const findPageId = (target: SceneNode) => {
  let current: BaseNode | null = target;
  while (current && !isPageNode(current)) {
    current = current.parent ? current.parent : null;
  }
  assertDefined(current);
  return current.id;
};
