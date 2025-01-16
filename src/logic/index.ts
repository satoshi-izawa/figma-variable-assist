import { isSceneNode, isStyle, isVariable } from '../util/nodeTypeGuard';
import { postLogicMessage } from '../util/postMessage';
import { createTargetsMap } from './createTargetsMap';

figma.showUI(__html__);

figma.ui.onmessage = (message: UIMessage) => {
  void (async () => {
    switch (message.type) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      case 'refresh': {
        await figma.loadAllPagesAsync();
        const targets = [
          ...(await Promise.all([
            figma.variables.getLocalVariablesAsync(),
            figma.getLocalEffectStylesAsync(),
            figma.getLocalGridStylesAsync(),
            figma.getLocalPaintStylesAsync(),
            figma.getLocalTextStylesAsync(),
          ])),
          figma.root.findAll().filter(node => isSceneNode(node)),
        ].flat();
        const tmpMap = [...createTargetsMap(targets).entries()];
        const map: SerializableTargetMap = Object.fromEntries(
          tmpMap.map(([id, item]) => [
            id,
            {
              target: {
                id: item.target.id,
                name: item.target.name,
                type: isVariable(item.target) ? 'VARIABLE' : isStyle(item.target) ? item.target.type : 'SCENE',
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
