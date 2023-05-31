import ApplicationController from './ApplicationController';
import KeyboardController from './KeyboardController';

function initApplication() {
  KeyboardController.start();
  ApplicationController.start();
}

export default initApplication;
