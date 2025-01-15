type Target = Variable | EffectStyle | GridStyle | PaintStyle | TextStyle;

type TargetMap = Map<Target['id'], TargetTreeItem>;

interface TargetTreeItem {
  target: Target;
  children: Target['id'][];
  parent: Target['id'][];
}

interface SerializableTarget {
  id: Target['id'];
  name: Target['name'];
  type: 'VARIABLE' | Exclude<Target, Variable>['type'];
}

interface SerializableTargetItem {
  target: SerializableTarget;
  children: Target['id'][];
  parent: Target['id'][];
}

type SerializableTargetMap = Record<Target['id'], SerializableTargetItem>;
