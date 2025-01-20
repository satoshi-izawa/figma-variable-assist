import { assertDefined } from '../util/assertDefined';
import { isSceneNode } from '../util/nodeTypeGuard';
import { postLogicMessage } from '../util/postMessage';
import { convertToSerializable } from './convertToSerializable';
import { createTargetsMap } from './createTargetsMap';

figma.showUI(__html__, {
  width: 400,
  height: 800,
});

figma.ui.onmessage = (message: UIMessages) => {
  void (async () => {
    switch (message.type) {
      case 'refresh': return refresh(message);
      case 'moveToScene': return moveToScene(message);
    }
  })();
};

const refresh = async (_message: UIMessage<'refresh'>) => {
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
  const map = createTargetsMap(targets);
  postLogicMessage({ type: 'createTargetMap', map: convertToSerializable(map) });
}

const moveToScene = async (message: UIMessage<'moveToScene'>) => {
  if (figma.currentPage.id !== message.pageId) {
    const page = figma.root.findChild(node => node.id === message.pageId);
    assertDefined(page);
    await figma.setCurrentPageAsync(page);
  }
  const node = figma.currentPage.findOne(({ id }) => id === message.id);
  assertDefined(node);
  figma.viewport.scrollAndZoomIntoView([node]);
  figma.currentPage.selection = [node];
}
