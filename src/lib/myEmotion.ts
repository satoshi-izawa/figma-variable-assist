import createEmotion from '@emotion/css/create-instance';

// eslint-disable-next-line @typescript-eslint/unbound-method
export const { css, injectGlobal, keyframes } = createEmotion({
  key: 'css',
  stylisPlugins: [],
});
