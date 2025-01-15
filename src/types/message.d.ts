interface UIMessageParameters {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  refresh: {};
}

type UIMessage = {
  [P in keyof UIMessageParameters]: { type: P } & UIMessageParameters[P];
}[keyof UIMessageParameters];

interface LogicMessageParameters {
  createTargetMap: {
    map: SerializableTargetMap;
  };
}

type LogicMessage = {
  [P in keyof LogicMessageParameters]: { type: P } & LogicMessageParameters[P];
}[keyof LogicMessageParameters];
