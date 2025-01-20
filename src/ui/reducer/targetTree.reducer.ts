import { useReducer } from 'react';

interface State {
  rootItems: SerializableTargetTreeItem[];
  map: SerializableTargetMap;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ActionParams = {
  update: {
    map: SerializableTargetMap;
  };
};

const reducer = (state: State, action: StoreAction<ActionParams>): State => {
  switch (action.type) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    case 'update': {
      const rootItems = Object.values(action.map).filter(
        v => v.parent.length === 0 && v.target.property.type !== 'SCENE',
      );
      return {
        ...state,
        map: action.map,
        rootItems,
      };
    }
  }
};

/** @private */
export const useTargetTreeReducer = () => {
  const [state, dispatch] = useReducer(reducer, { map: {}, rootItems: [] });
  return { dispatch, state };
};
