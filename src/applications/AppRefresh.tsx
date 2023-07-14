import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';

class AppRefresh extends BaseApplication {
  public name: AppName = 'refresh';

  protected validate() {
    return this.validateArgs();
  }

  protected run() {
    location.reload();
    this.stop();
  }

  protected cleanup() {}
}

export default AppRefresh;
