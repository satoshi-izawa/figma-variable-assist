type MessageType = 'test';

interface MessageParameters {
  test: {
    num: number;
  };
}

type Message = { [P in MessageType]: { type: P } & MessageParameters[P] };
