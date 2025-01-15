import { isVariable } from '../util/isVariable';
import { postLogicMessage } from '../util/postMessage';
import { createTargetsMap } from './createTargetsMap';

figma.showUI(__html__);

figma.ui.onmessage = (message: UIMessage) => {
  void (async () => {
    switch (message.type) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      case 'refresh': {
        const targets = [
          ...(await Promise.all([
            figma.variables.getLocalVariablesAsync(),
            figma.getLocalEffectStylesAsync(),
            figma.getLocalGridStylesAsync(),
            figma.getLocalPaintStylesAsync(),
            figma.getLocalTextStylesAsync(),
          ])),
        ].flat();
        const tmpMap = [...createTargetsMap(targets).entries()];
        const map: SerializableTargetMap = Object.fromEntries(
          tmpMap.map(([id, item]) => [
            id,
            {
              target: {
                id: item.target.id,
                name: item.target.name,
                type: isVariable(item.target) ? 'VARIABLE' : item.target.type,
              },
              children: item.children,
              parent: item.parent,
            } satisfies SerializableTargetItem,
          ]),
        );
        postLogicMessage({ type: 'createTargetMap', map });
      }
    }
  })();
};
