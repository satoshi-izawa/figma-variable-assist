export const isVariable: (target: Target) => target is Variable = target =>
  'valuesByMode' in target;

export const isVariableAlias = (
  variable: VariableValue | Record<string, VariableAlias>,
): variable is VariableAlias =>
  typeof variable === 'object' && 'id' in variable;

export const isStyleNode: (
  target: Target,
) => target is EffectStyle | GridStyle | PaintStyle | TextStyle = target =>
  'getStyleConsumersAsync' in target;

export const isSceneNode = (node: PageNode | SceneNode): node is SceneNode =>
  !('selection' in node);

export const isPageNode = (node: BaseNode): node is PageNode =>
  node.type === 'PAGE';

export const isVariableItem = (child: SerializableTargetTreeItem) => {
  const { type } = child.target.property;
  return type === 'VARIABLE';
};

export const isStyleItem = (child: SerializableTargetTreeItem) => {
  const { type } = child.target.property;
  return (
    type === 'EFFECT' || type === 'GRID' || type === 'PAINT' || type === 'TEXT'
  );
};

export const isSceneItem = (child: SerializableTargetTreeItem) => {
  const { type } = child.target.property;
  return type === 'SCENE';
};
