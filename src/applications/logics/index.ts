import ApplicationController from './ApplicationController';
import KeyboardController from './KeyboardController';
import DisplayController from './DisplayController';

function initApplication() {
  ApplicationController.start();
  DisplayController.start();
  KeyboardController.start();

  // startup
  ApplicationController.getInstance().runApplication('home');
}

export default initApplication;
