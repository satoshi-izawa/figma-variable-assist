import { createTargetsMap } from './createTargetsMap';

figma.showUI(__html__);

figma.ui.onmessage = ({ type: _type }: { type: string }) => {
  void (async () => {
    const targets = [
      ...(await Promise.all([
        figma.variables.getLocalVariablesAsync(),
        figma.getLocalEffectStylesAsync(),
        figma.getLocalGridStylesAsync(),
        figma.getLocalPaintStylesAsync(),
        figma.getLocalTextStylesAsync(),
      ])),
    ].flat();
    const _map = createTargetsMap(targets);
  })();
};
