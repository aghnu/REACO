import { type AppNames } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';
import { v4 as uuid } from 'uuid';

class AppClear extends BaseApplication {
  public name: AppNames = 'home';
  public id = uuid();

  private clearConsole() {
    this.applicationController.clearApplications();
    this.displayController.printClear();
  }

  public start() {
    this.clearConsole();
  }
}

export default AppClear;
