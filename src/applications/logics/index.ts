import ApplicationController from './ApplicationController';
import KeyboardController from './KeyboardController';
import DisplayController from './DisplayController';
import RouteController from './RouteController';
import GlobalStyleController from './GlobalStyleController';

function initApplication() {
  GlobalStyleController.start();
  ApplicationController.start();
  DisplayController.start();
  KeyboardController.start();
  RouteController.start();

  // startup
  RouteController.getInstance().processCurrentPath();
}

export default initApplication;
