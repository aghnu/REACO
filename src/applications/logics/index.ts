import ApplicationController from './ApplicationController';
import KeyboardController from './KeyboardController';
import DisplayController from './DisplayController';
import RouteController from './RouteController';
import GlobalStyleController from './GlobalStyleController';

export function startApplication() {
  GlobalStyleController.getInstance();
  ApplicationController.getInstance();
  DisplayController.getInstance();
  KeyboardController.getInstance();
  RouteController.getInstance();

  return () => {
    GlobalStyleController.destroy();
    ApplicationController.destroy();
    DisplayController.destroy();
    KeyboardController.destroy();
    RouteController.destroy();
  };
}
