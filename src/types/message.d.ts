interface UIMessageParameters {
  refresh: object;
  moveToScene: {
    pageId: Target['id'];
    id: Target['id'];
  };
}

type UIMessage<T extends keyof UIMessageParameters> = {
  type: T;
} & UIMessageParameters[T];

type UIMessages = {
  [P in keyof UIMessageParameters]: UIMessage<P>;
}[keyof UIMessageParameters];

interface LogicMessageParameters {
  createTargetMap: {
    map: SerializableTargetMap;
  };
}

type LogicMessage = {
  [P in keyof LogicMessageParameters]: { type: P } & LogicMessageParameters[P];
}[keyof LogicMessageParameters];
