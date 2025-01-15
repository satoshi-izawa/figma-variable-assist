document.getElementById('test')?.addEventListener('click', () => {
  console.log('click');
  parent.postMessage({ pluginMessage: { type: 'test' } }, '*');
});
