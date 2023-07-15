import ApplicationController from './ApplicationController';
import KeyboardController from './KeyboardController';
import DisplayController from './DisplayController';
import RouteController from './RouteController';
import GlobalStyleController from './GlobalStyleController';
import HistoryController from './HistoryController';

const CONTROLLERS = [
  GlobalStyleController,
  ApplicationController,
  DisplayController,
  KeyboardController,
  RouteController,
  HistoryController,
] as const;

export function stopApplication() {
  CONTROLLERS.forEach((C) => {
    C.destroy();
  });
}

export function startApplication() {
  CONTROLLERS.forEach((C) => C.getInstance());

  return () => {
    CONTROLLERS.forEach((C) => {
      C.destroy();
    });
  };
}
