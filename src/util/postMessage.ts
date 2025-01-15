export const postUIMessage = (message: UIMessage) => {
  parent.postMessage({ pluginMessage: message }, '*');
};

export const postLogicMessage = (message: LogicMessage) => {
  figma.ui.postMessage(message);
};
