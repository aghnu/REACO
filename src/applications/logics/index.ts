import ApplicationController from './ApplicationController';
import KeyboardController from './KeyboardController';
import DisplayController from './DisplayController';

function initApplication() {
  ApplicationController.start();
  DisplayController.start();
  KeyboardController.start();
}

export default initApplication;
