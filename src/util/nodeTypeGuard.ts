export const isVariable: (target: Target) => target is Variable = target =>
  'valuesByMode' in target;

export const isVariableAlias = (
  variable: VariableValue | Record<string, VariableAlias>,
): variable is VariableAlias =>
  typeof variable === 'object' && 'id' in variable;


export const isStyle: (
  target: Target,
) => target is EffectStyle | GridStyle | PaintStyle | TextStyle = target =>
    'getStyleConsumersAsync' in target;

export const isSceneNode = (node: PageNode | SceneNode): node is SceneNode =>
  !('selection' in node);

export const isPageNode = (node: BaseNode): node is PageNode =>
  node.type === 'PAGE';
