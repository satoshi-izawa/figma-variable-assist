export const postUIMessage = (message: UIMessages) => {
  parent.postMessage({ pluginMessage: message }, '*');
};

export const postLogicMessage = (message: LogicMessage) => {
  figma.ui.postMessage(message);
};
