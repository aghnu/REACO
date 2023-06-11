import ApplicationController from './ApplicationController';
import KeyboardController from './KeyboardController';
import DisplayController from './DisplayController';
import RouteController from './RouteController';

function initApplication() {
  ApplicationController.start();
  DisplayController.start();
  KeyboardController.start();
  RouteController.start();

  // startup
  RouteController.getInstance().processCurrentPath();
}

export default initApplication;
