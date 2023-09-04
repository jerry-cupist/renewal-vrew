export const buildCustomEventManager = () => {
  let eventMap: Record<string, ((event: any) => void)[]> = {};

  const addEventListener = (eventName: string, callbackFn: any) => {
    const handlers = eventMap[eventName] || [];
    eventMap[eventName] = handlers.concat(callbackFn);
  };

  const emit = (eventName: string, event: any) => {
    const handlers = eventMap[eventName] || [];

    handlers.forEach(handler => {
      handler(event);
    });
  };

  const removeEventListener = (eventName: string, eventListener: any) => {
    const handlers = eventMap[eventName] || [];
    eventMap[eventName] = handlers.filter(handler => handler !== eventListener);
  };

  return {
    removeEventListener,
    addEventListener,
    emit,
  };
};
