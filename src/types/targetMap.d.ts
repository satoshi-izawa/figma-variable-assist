type Target = Variable | EffectStyle | GridStyle | PaintStyle | TextStyle | SceneNode;

type TargetMap = Map<Target['id'], TargetTreeItem>;

interface TargetTreeItem {
  target: Target;
  children: Target['id'][];
  parent: Target['id'][];
}

interface SerializableTargetProperty {
  COLOR_VARIABLE: {
    values: VariableValue[];
  };
  VARIABLE: {
    values: VariableValue[];
  };
  SCENE: {
    pageId: Target['id'];
  };
  TEXT: object;
  EFFECT: object;
  GRID: object;
  PAINT: object;
}

interface SerializableTarget<T extends keyof SerializableTargetProperty> {
  id: Target['id'];
  name: Target['name'];
  property: {
    type: T;
  } & SerializableTargetProperty[T];
}

type SerializableTargets = {
  [P in keyof SerializableTargetProperty]: SerializableTarget<P>;
}[keyof SerializableTargetProperty];

interface SerializableTargetTreeItem {
  target: SerializableTargets;
  children: Target['id'][];
  parent: Target['id'][];
}

type SerializableTargetMap = Record<Target['id'], SerializableTargetTreeItem>;
