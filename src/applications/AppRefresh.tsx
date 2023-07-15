import { type AppName } from '@type/ApplicationTypes';
import BaseApplication from '@base/BaseApplication';

class AppRefresh extends BaseApplication {
  public name: AppName = 'refresh';

  protected validate() {
    return this.validateArgs();
  }

  protected run() {
    window.setTimeout(() => {
      location.reload();
    }, 100);
    this.stop();
  }

  protected cleanup() {}
}

export default AppRefresh;
