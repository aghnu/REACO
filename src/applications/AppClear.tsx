import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import ApplicationController from './logics/ApplicationController';
import DisplayController from './logics/DisplayController';

class AppClear extends BaseApplication {
  public name: AppName = 'home';

  protected validate() {
    return this.validateArgs();
  }

  protected run() {
    ApplicationController.getInstance().clearApplications();
    DisplayController.getInstance().printClear();
    this.stop();
  }

  protected cleanup() {}
}

export default AppClear;
