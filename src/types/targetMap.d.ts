type Target =
  | Variable
  | EffectStyle
  | GridStyle
  | PaintStyle
  | TextStyle
  | SceneNode;

type TargetMap = Map<Target['id'], TargetTreeItem>;

type ParentOrChild = [string, Target['id']];

interface TargetTreeItem {
  target: Target;
  children: ParentOrChild[];
  parent: ParentOrChild[];
  used: ParentOrChild[];
  styleReference: Map<string, Set<Target['id']>>;
}

type SerializableValue = {
  type: 'ALIAS';
  name: Target['name'];
  reference: SerializableValue;
} | {
  type: 'COLOR';
  hex: string;
} | {
  type: 'STRING';
  value: string;
} | {
  type: 'NUMBER';
  value: number;
} | {
  type: 'BOOLEAN';
  value: boolean;
} | null;

interface SerializableTargetProperty {
  VARIABLE: {
    values: SerializableValue[];
  };
  SCENE: {
    pageId: Target['id'];
  };
  TEXT: object;
  EFFECT: object;
  GRID: object;
  PAINT: {
    values: SerializableValue[];
  };
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
  children: ParentOrChild[];
  parent: ParentOrChild[];
  used: ParentOrChild[];
}

type SerializableTargetMap = Record<Target['id'], SerializableTargetTreeItem>;
